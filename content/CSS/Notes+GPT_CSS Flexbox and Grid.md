

## 1. Flexbox (Flexible Box Layout)

Flexbox is a one-dimensional layout system used for laying out items in rows or columns.

### Key Properties of Flexbox:

### **Container Properties:**

1. `display: flex;` – Enables Flexbox on the container.
2. `flex-direction` – Controls the main axis direction.
   - `row` (default) – Left to right.
   - `row-reverse` – Right to left.
   - `column` – Top to bottom.
   - `column-reverse` – Bottom to top.
3. `justify-content` – Aligns items on the main axis.
   - `flex-start` (default) – Items align at the start.
   - `flex-end` – Items align at the end.
   - `center` – Items align in the center.
   - `space-between` – Space between items.
   - `space-around` – Space around items.
   - `space-evenly` – Equal spacing around items.
4. `align-items` – Aligns items on the cross axis.
   - `stretch` (default) – Items stretch to fit.
   - `flex-start` – Aligned at the start.
   - `flex-end` – Aligned at the end.
   - `center` – Aligned in the center.
   - `baseline` – Aligned based on text baseline.
5. `align-content` – Aligns rows on the cross axis (when wrapping).
   - Similar values as `align-items`.
6. `flex-wrap` – Controls wrapping of flex items.
   - `nowrap` (default) – Items stay on one line.
   - `wrap` – Items wrap to the next line.
   - `wrap-reverse` – Items wrap in reverse.
7. `gap` – Controls spacing between items.

### **Item Properties:**

1. `order` – Controls the visual order of items (default: `0`).
2. `flex-grow` – Controls how much an item grows relative to others (default: `0`).
3. `flex-shrink` – Controls how much an item shrinks (default: `1`).
4. `flex-basis` – Initial size of the item before growth/shrink (auto, %, px, etc.).
5. `flex` – Shorthand for `flex-grow`, `flex-shrink`, and `flex-basis`.
   - Example: `flex: 1 0 200px;`
6. `align-self` – Overrides `align-items` for an individual item.

### Example:
```css
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
.item {
  flex: 1;
}
```

---

## 2. CSS Grid

CSS Grid is a two-dimensional layout system for controlling both rows and columns.

### Key Properties of CSS Grid:

### **Container Properties:**

1. `display: grid;` – Enables Grid layout.
2. `grid-template-columns` – Defines column structure.
   - Example: `grid-template-columns: 1fr 2fr 1fr;`
3. `grid-template-rows` – Defines row structure.
   - Example: `grid-template-rows: 100px auto;`
4. `grid-column-gap` / `grid-row-gap` – Space between grid items (deprecated, use `gap`).
5. `gap` – Shorthand for `row-gap` and `column-gap`.
6. `grid-auto-rows` – Sets the size of automatically created rows.
7. `grid-auto-columns` – Sets the size of automatically created columns.
8. `grid-auto-flow` – Controls item placement.
   - `row` (default) – Places items row-wise.
   - `column` – Places items column-wise.

### **Item Properties:**

1. `grid-column` – Specifies column start/end position.
   - Example: `grid-column: 1 / 3;`
2. `grid-row` – Specifies row start/end position.
   - Example: `grid-row: 2 / 4;`
3. `grid-area` – Shorthand for `grid-row-start`, `grid-column-start`, `grid-row-end`, and `grid-column-end`.
4. `justify-self` – Aligns item horizontally.
5. `align-self` – Aligns item vertically.
6. `place-self` – Shorthand for `align-self` and `justify-self`.

### Example:
```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.item {
  grid-column: 1 / 3;
}
```

---

## 3. Differences Between Flexbox and Grid

| Feature           | Flexbox                  | CSS Grid                   |
|-------------------|--------------------------|----------------------------|
| Layout Type       | One-dimensional (row/col)| Two-dimensional (row+col)  |
| Content Flow      | Controlled by items      | Controlled by grid tracks  |
| Best For          | Simple, linear layouts   | Complex, structured layouts |
| Alignment         | `justify-content`, `align-items` | `place-items`, `place-content` |
| Item Order        | `order` property         | `grid-row`, `grid-column`  |
| Responsiveness    | `flex-wrap` and `flex-basis` | `auto-fit`, `auto-fill`   |

---

## 4. When to Use Flexbox vs Grid

- **Use Flexbox** for:
  - Navigation bars
  - Single-dimensional layouts
  - Dynamic content alignment

- **Use Grid** for:
  - Layouts with both rows and columns
  - Complex page layouts
  - Responsive designs with defined areas

---

## 5. Common Patterns:

**Centered Content (Flexbox)**
```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

**Card Layout (CSS Grid)**
```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
```

**Holy Grail Layout (CSS Grid)**
```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
}
.header { grid-column: 1 / 4; }
.footer { grid-column: 1 / 4; }
.main { grid-column: 2; }
```

