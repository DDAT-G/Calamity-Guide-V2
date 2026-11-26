"""Offline structural checks; does not crawl or validate gameplay facts."""
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
index = json.loads((root / "sources/wiki-index.json").read_text(encoding="utf-8"))
records = json.loads((root / "research/records.json").read_text(encoding="utf-8"))["records"]
ids = set()
for entry in index["entries"]:
    assert entry["id"] not in ids, "duplicate source ID"
    ids.add(entry["id"])
    assert entry["url"].startswith("https://calamitymod.wiki.gg/wiki/"), "unexpected source"
record_ids = set()
for record in records:
    assert record["id"] and record["id"] not in record_ids, "missing or duplicate record ID"
    record_ids.add(record["id"])
    assert record["sourceUrl"].startswith("https://calamitymod.wiki.gg/wiki/"), "unexpected primary source"
    assert record["status"] in {"pending", "wiki_based", "wiki_reviewed", "cross_checked", "conflict", "needs_review"}, "unknown status"
print(f"Source index: {len(ids)}; research records: {len(records)}; structural checks passed.")
