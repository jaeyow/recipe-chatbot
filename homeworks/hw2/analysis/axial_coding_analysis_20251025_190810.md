# Axial Coding Analysis

**Generated:** 2025-10-25 19:08:10
**Source:** /Users/josereyes/Dev/recipe-chatbot/results/opencodes/opencodes_results_20251025_154225.csv
**Open Codes Analyzed:** 61

---

## AXIAL CODING ANALYSIS

### Primary Failure Mode Categories

1. **Formatting and Presentation Issues**
   - Serving size formatting inconsistencies and missing formatting standards  
     (e.g., "serving size not formatted correctly", "Serving size formatting issue", "Serving Size is not standard format")  
   - Instruction formatting problems such as missing bolding, lack of bullet points, incorrect numbering  
     (e.g., "instructions are not formatted correctly", "Instruction formatting issues", "Instruction sections are numbered and bolded but text inside must be bullet list")  
   - Fun Tip / Tip label inconsistencies and formatting errors (missing bold, italic instead of bold, wrong label "Tip" or "Pro Tip" instead of "Fun Tip")  
     (e.g., "Displays Tip instead of Fun Tip", "Fun Tip is italicised. It should be bold", "Displays 'Pro Tip' instead of 'Fun Tip'")  
   - Missing or ambiguous section headers (prep time and serving size sometimes absent or not clearly labeled)  
     (e.g., "prep time not in description", "This recipe does not include serving size", "serving size is not clear, i.e., not in its own section")

2. **Content Completeness and Accuracy Issues**
   - Missing critical recipe information such as preparation time and serving size  
     (e.g., "prep time not specified", "prep time not found in recipe description", "This recipe does not mention preparation time")  
   - Ingredient and dietary accuracy (e.g., pescetarian dish missing fish ingredient, vegetarian dish using dashi derived from bonito flakes without note)  
     (e.g., "This is supposed to be a pescetarian dish, but fish is not an ingredient", "Make it clear vegetarian means to avoid dashi, bonito flakes")  
   - Missing important allergen or dietary notes (e.g., "Very important detail like being nut-free should be mentioned")

3. **User Experience (UX) and Clarity Issues**
   - Ambiguities in recipe description leading to user confusion (e.g., liquid misidentified as drink—miso soup)  
     (e.g., "miso soup is liquid but not a drink")  
   - Insufficient guidance in instructions (lack of short step descriptors in bold, unclear instructional hierarchy)  
     (e.g., "The instruction individual steps should have a step short descriptor in bold", "Instructions should be bolded then bulleted")  
   - Potential misleading or incomplete diet-specific reassurance and labeling  
     (e.g., "We need to emphasise vegetarian dashi ingredients to reassure the user")

4. **Positive Feedback (Counter-Examples)**
   - Recipe completeness and quality praised with clear serving size and plating description  
     (e.g., "The recipe and instructions are complete and good quality, and even the dish plating is described in detail")

---

### Pattern Analysis

- **Dominant focus on formatting issues**, especially around serving size, instruction formatting, and "Fun Tip" labeling. Multiple codes highlight similar formatting problems with slight variations (e.g., singular/plural, slightly different wordings), indicating a consistent systemic problem with how information is visually structured and presented.

- **Repeated concern about missing prep time and serving size** suggests these are core metadata fields frequently omitted or poorly integrated in chatbot responses.

- **Dietary accuracy and reassurance themes emerge subtly but critically**, showing that content quality is not only factual but tied to user trust and safety (vegetarian, pescetarian, allergen considerations).

- **Ambiguities in user-facing terminology and instruction clarity** affect usability, e.g., misclassified recipe types or unclear step formatting.

- The **"Fun Tip" label inconsistently appears as "Tip", "Fun tip", or even "Pro Tip”, often missing bold formatting**—indicating issues with template standardization or content mapping in the chatbot output.

---

### Priority Ranking

1. **Formatting and Presentation Issues** (Highest Frequency & Moderate to High Severity)  
   - These issues occur most frequently across codes (more than half relate to formatting). Poor formatting can significantly impair readability and user comprehension.

2. **Content Completeness - Missing Prep Time & Serving Size** (High Frequency & High Severity)  
   - Missing prep time and serving size reduce recipe usefulness and user satisfaction. Critical recipe metadata absent undermines the chatbot’s reliability.

3. **Content Accuracy - Dietary and Allergen Information** (Moderate Frequency & High Severity)  
   - Incorrect or missing dietary details could cause user confusion or health risks, especially for allergen or diet-restricted users.

4. **User Experience and Instruction Clarity Issues** (Lower Frequency & Moderate Severity)  
   - Important but less frequent. Improving instruction clarity directly supports user success in cooking.

5. **Positive Notes** (Inform improvements but not failure modes)

---

### Root Cause Analysis

- **Inconsistent or incomplete template implementation** in the chatbot responses likely cause formatting discrepancies (e.g., inconsistent bolding, numbering, bullet lists, label capitalization).

- **Data parsing or content mapping failures** from source recipe databases may lead to missing metadata like prep time or serving size, or incorrect dietary annotations (e.g., pescetarian label mismatch).

- **Lack of standardized content style guide enforcement** for recipe presentation (both formatting and labels like "Fun Tip") leads to variability confusing users.

- **Insufficient domain knowledge integration or tagging** around dietary restrictions (vegetarian vs pescetarian) and allergen flagging creates content inaccuracies that undermine trust.

- **Limited validation and quality assurance checks on chatbot outputs** prior to delivery allow multiple small formatting and content errors to propagate.

---

### Recommendations

1. **Implement a comprehensive formatting style guide and enforce template consistency:**  
   - Ensure serving size, prep time, instructions, and tips have clearly defined formatting standards (e.g., headers bolded, bullet vs numbered lists, label capitalization) and validate chatbot output against these before responding.

2. **Enhance data input verification and completeness checks:**  
   - Require mandatory presence of critical metadata fields (prep time, serving size) in recipe data sources or chatbot responses; prompt re-query or flag if missing.

3. **Integrate a dietary and allergen validation layer:**  
   - Cross-check ingredient lists against dietary labels (vegetarian, pescetarian, nut-free) and display explicit reassurance messages or warnings in recipe introductions.

4. **Standardize "Fun Tip" labeling and presentation:**  
   - Fix template discrepancies to always display "Fun Tip" in bold, no variation as "Tip" or "Pro Tip", and ensure consistent italicization/bolding.

5. **Improve instruction clarity through structured formatting:**  
   - Use step headers in bold with short descriptors and bulleted step text; avoid mixing numbers inside sections unless for main sections only.

6. **Add automated QA scripts or manual review checkpoints to catch recurring formatting/content errors before user delivery.**

7. **Consider user testing focused on clarity, formatting perception, and dietary trust to guide iterative improvements.**

---

By addressing these root causes systematically, the recipe chatbot can deliver clearer, more accurate, and user-friendly recipe outputs that enhance user trust and engagement.