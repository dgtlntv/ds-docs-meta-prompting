#!/usr/bin/env python3
"""
Deterministic readability scoring for markdown documentation.

Computes:
- Flesch-Kincaid Grade Level
- Flesch Reading Ease
- Average sentence length
- Average word length (in syllables)
- Passive voice percentage estimate
- Per-section breakdown

Input: path to a markdown file
Output: JSON to stdout

No external dependencies — uses only Python stdlib.
"""

import json
import re
import sys


def strip_markdown(text: str) -> str:
    """Remove markdown formatting, code blocks, and front matter."""
    # Remove YAML front matter
    text = re.sub(r'^---\n.*?\n---\n', '', text, flags=re.DOTALL)

    # Remove fenced code blocks
    text = re.sub(r'```[\s\S]*?```', '', text)

    # Remove inline code
    text = re.sub(r'`[^`]+`', 'code', text)

    # Remove images
    text = re.sub(r'!\[.*?\]\(.*?\)', '', text)

    # Remove links but keep text
    text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)

    # Remove HTML tags
    text = re.sub(r'<[^>]+>', '', text)

    # Remove heading markers
    text = re.sub(r'^#{1,6}\s+', '', text, flags=re.MULTILINE)

    # Remove bold/italic markers
    text = re.sub(r'\*{1,3}([^*]+)\*{1,3}', r'\1', text)
    text = re.sub(r'_{1,3}([^_]+)_{1,3}', r'\1', text)

    # Remove blockquote markers
    text = re.sub(r'^>\s*', '', text, flags=re.MULTILINE)

    # Remove horizontal rules
    text = re.sub(r'^[-*_]{3,}\s*$', '', text, flags=re.MULTILINE)

    # Remove list markers
    text = re.sub(r'^\s*[-*+]\s+', '', text, flags=re.MULTILINE)
    text = re.sub(r'^\s*\d+\.\s+', '', text, flags=re.MULTILINE)

    # Remove table formatting
    text = re.sub(r'\|', ' ', text)
    text = re.sub(r'^[-:| ]+$', '', text, flags=re.MULTILINE)

    # Collapse whitespace
    text = re.sub(r'\n{3,}', '\n\n', text)

    return text.strip()


def count_syllables(word: str) -> int:
    """Estimate syllable count for an English word."""
    word = word.lower().strip()
    if not word:
        return 0

    # Handle common short words
    if len(word) <= 2:
        return 1

    # Remove trailing silent e
    if word.endswith('e') and not word.endswith('le'):
        word = word[:-1]

    # Count vowel groups
    vowels = 'aeiouy'
    count = 0
    prev_vowel = False
    for char in word:
        is_vowel = char in vowels
        if is_vowel and not prev_vowel:
            count += 1
        prev_vowel = is_vowel

    # Every word has at least one syllable
    return max(1, count)


def split_sentences(text: str) -> list[str]:
    """Split text into sentences."""
    # Split on sentence-ending punctuation followed by space or newline
    sentences = re.split(r'(?<=[.!?])\s+', text)
    # Filter out empty strings and very short fragments
    return [s.strip() for s in sentences if len(s.strip()) > 2]


def get_words(text: str) -> list[str]:
    """Extract words from text."""
    words = re.findall(r'[a-zA-Z]+(?:\'[a-zA-Z]+)?', text)
    return [w for w in words if len(w) > 0]


def estimate_passive_voice(sentences: list[str]) -> float:
    """Estimate percentage of sentences with passive voice."""
    if not sentences:
        return 0.0

    passive_patterns = [
        r'\b(?:is|are|was|were|been|being)\s+\w+ed\b',
        r'\b(?:is|are|was|were|been|being)\s+\w+en\b',
        r'\b(?:has|have|had)\s+been\s+\w+ed\b',
        r'\b(?:has|have|had)\s+been\s+\w+en\b',
        r'\b(?:will|shall|can|could|would|should|may|might)\s+be\s+\w+ed\b',
    ]

    passive_count = 0
    for sentence in sentences:
        for pattern in passive_patterns:
            if re.search(pattern, sentence, re.IGNORECASE):
                passive_count += 1
                break

    return round((passive_count / len(sentences)) * 100, 1)


def compute_readability(text: str) -> dict:
    """Compute readability metrics for a block of text."""
    sentences = split_sentences(text)
    words = get_words(text)

    if not sentences or not words:
        return {
            'flesch_kincaid_grade': 0,
            'flesch_reading_ease': 0,
            'avg_sentence_length': 0,
            'avg_word_syllables': 0,
            'passive_voice_pct': 0,
            'sentence_count': 0,
            'word_count': 0,
        }

    total_syllables = sum(count_syllables(w) for w in words)
    avg_sentence_length = len(words) / len(sentences)
    avg_syllables_per_word = total_syllables / len(words)

    # Flesch-Kincaid Grade Level
    fk_grade = 0.39 * avg_sentence_length + 11.8 * avg_syllables_per_word - 15.59

    # Flesch Reading Ease
    fk_ease = 206.835 - 1.015 * avg_sentence_length - 84.6 * avg_syllables_per_word

    return {
        'flesch_kincaid_grade': round(fk_grade, 1),
        'flesch_reading_ease': round(fk_ease, 1),
        'avg_sentence_length': round(avg_sentence_length, 1),
        'avg_word_syllables': round(avg_syllables_per_word, 2),
        'passive_voice_pct': estimate_passive_voice(sentences),
        'sentence_count': len(sentences),
        'word_count': len(words),
    }


def extract_sections(text: str) -> dict[str, str]:
    """Split markdown into sections by heading."""
    lines = text.split('\n')
    sections = {}
    current_heading = '(introduction)'
    current_content = []

    for line in lines:
        heading_match = re.match(r'^(#{1,6})\s+(.+)$', line)
        if heading_match:
            # Save previous section
            content = '\n'.join(current_content).strip()
            if content:
                sections[current_heading] = content
            current_heading = heading_match.group(2).strip()
            current_content = []
        else:
            current_content.append(line)

    # Save last section
    content = '\n'.join(current_content).strip()
    if content:
        sections[current_heading] = content

    return sections


def find_flags(text: str) -> list[dict]:
    """Find specific readability issues."""
    flags = []
    sentences = split_sentences(strip_markdown(text))

    for sentence in sentences:
        words = get_words(sentence)

        # Long sentences
        if len(words) > 25:
            flags.append({
                'type': 'long_sentence',
                'severity': 'suggestion',
                'word_count': len(words),
                'text': sentence[:100] + ('...' if len(sentence) > 100 else ''),
            })

    # Long paragraphs
    paragraphs = re.split(r'\n\n+', strip_markdown(text))
    for para in paragraphs:
        para_sentences = split_sentences(para)
        if len(para_sentences) > 5:
            flags.append({
                'type': 'long_paragraph',
                'severity': 'suggestion',
                'sentence_count': len(para_sentences),
                'text': para[:100] + ('...' if len(para) > 100 else ''),
            })

    return flags


def analyze_file(filepath: str) -> dict:
    """Analyze a markdown file and return readability report."""
    with open(filepath, 'r', encoding='utf-8') as f:
        raw_text = f.read()

    clean_text = strip_markdown(raw_text)
    sections = extract_sections(raw_text)

    # Overall scores
    overall = compute_readability(clean_text)

    # Per-section scores
    section_scores = {}
    for heading, content in sections.items():
        clean_content = strip_markdown(content)
        if len(get_words(clean_content)) >= 10:  # Skip very short sections
            section_scores[heading] = compute_readability(clean_content)

    # Flags
    flags = find_flags(raw_text)

    return {
        'file': filepath,
        'overall': overall,
        'sections': section_scores,
        'flags': flags,
    }


def main():
    if len(sys.argv) != 2:
        print(f'Usage: {sys.argv[0]} <path-to-markdown-file>', file=sys.stderr)
        sys.exit(1)

    filepath = sys.argv[1]

    try:
        result = analyze_file(filepath)
    except FileNotFoundError:
        print(json.dumps({'error': f'File not found: {filepath}'}))
        sys.exit(1)
    except Exception as e:
        print(json.dumps({'error': str(e)}))
        sys.exit(1)

    print(json.dumps(result, indent=2))


if __name__ == '__main__':
    main()
