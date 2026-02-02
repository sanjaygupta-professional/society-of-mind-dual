---
title: "Chapter 25: Frame Arrays"
description: "How collections of related frames work together to represent complex objects and scenes from multiple perspectives."
---

A single frame represents one view of a situation, but real understanding requires seeing things from multiple perspectives. Chapter 25 introduces **frame arrays** — organized collections of frames that represent the same object or scene from different viewpoints and at different levels of detail.

When you walk around a building, your mind does not create a new representation from scratch at each step. Instead, a frame array links together the frames for each viewpoint, allowing smooth transitions as perspective changes. This mechanism explains how we maintain a coherent sense of objects despite constantly changing sensory input.

```mermaid
flowchart TB
    O[Object] --> F1[Frame: Front View]
    O --> F2[Frame: Side View]
    O --> F3[Frame: Top View]
    O --> F4[Frame: Detail View]
    F1 --- FA[Frame Array]
    F2 --- FA
    F3 --- FA
    F4 --- FA
    FA --> CP[Coherent Perception]
    V[Viewpoint Change] --> FA
```

<!-- beautiful-mermaid comparison -->
<div style="margin-top: 1.5rem; padding: 1rem; background: #1a1b26; border-radius: 8px;">
  <p style="color: #7aa2f7; font-size: 0.85rem; margin-bottom: 0.75rem; font-weight: 500;">Tokyo-night theme (beautiful-mermaid):</p>
  <img src="/diagrams/ch25-frame-arrays.svg" alt="Chapter diagram - tokyo-night theme" style="max-width: 100%; height: auto;" />
</div>
<!-- end beautiful-mermaid comparison -->

## Sections

| Section | Title | Link |
|---------|-------|------|
| 25.1 | Frame Arrays | [Read](/read/original/25-frame-arrays/) |
| 25.2 | Perspective and Viewpoint | [Read](/read/original/25-frame-arrays/) |
| 25.3 | Coherent Representation | [Read](/read/original/25-frame-arrays/) |

## Key Themes

- Frame arrays as multi-perspective representations
- Smooth transitions between viewpoints
- Object constancy despite changing input
- The relationship between frames and spatial reasoning

## Related Concepts

- [Frames](/concepts/frames/) — the individual frames that compose arrays
- [Trans-frames](/concepts/trans-frames/) — transitions between frame perspectives
- [Agencies](/concepts/agencies/) — the agencies that manage frame arrays

## Read This Chapter

- [Original text](/read/original/25-frame-arrays/)
- [Side-by-side companion](/read/side-by-side/25-frame-arrays/)
