export function generateInterviewReportPrompt({
    resume,
    selfDescription,
    jobDescription,
}: {
    resume: string;
    selfDescription: string;
    jobDescription: string;
}) {
    return `
        Generate an interview report for a candidate with the following details [Resume, Self-Description, Job-Description]:
            [Resume] : --------------------------------------
            [[${resume}]]
            [Self-Description] : ----------------------------
            [[${selfDescription}]]
            [Job-Description] : -----------------------------
            [[${jobDescription}]]
    `;
}

export function generateResumePdfPrompt({
    resume,
    selfDescription,
    jobDescription,
}: {
    resume: string;
    selfDescription: string;
    jobDescription: string;
}) {
    return `
    You are an expert recruiter, resume writer, ATS optimization specialist, and hiring manager.

    Your task is to generate a professional, ATS-friendly resume as a complete HTML document based only on the information provided.

    ========================
    INPUT
    ========================

    Resume:
    ${resume}

    Self Description:
    ${selfDescription}

    Job Description:
    ${jobDescription}

    ========================
    OBJECTIVE
    ========================

    Generate a resume that maximizes the candidate's chances of getting shortlisted for the provided job description while remaining truthful to the supplied information.

    Do NOT fabricate companies, job titles, dates, degrees, certifications, skills, projects, achievements, or experience.

    You may:
    - Rewrite content professionally.
    - Improve wording.
    - Reorder sections.
    - Highlight the most relevant experience.
    - Remove redundant or low-value information.

    ========================
    OUTPUT
    ========================

    Return ONLY valid JSON.

    Example:

    {
      "html": "<complete HTML document>"
    }

    Do not include markdown.
    Do not include explanations.
    Do not include code fences.
    Do not output anything except the JSON object.

    ========================
    RESUME REQUIREMENTS
    ========================

    The resume should:

    - Target ONE A4 page whenever reasonably possible.
    - Use a second page only if the candidate has substantial relevant experience.
    - Never intentionally increase the length.
    - Prefer quality over quantity.
    - Focus on accomplishments instead of responsibilities.
    - Naturally incorporate important keywords from the job description.
    - Sound completely human-written.
    - Be concise, confident, and professional.
    - Avoid generic AI-style language.
    - Avoid buzzwords and fluff.

    ========================
    SECTION PRIORITY
    ========================

    Highest priority:

    1. Professional Experience
    2. Relevant Projects
    3. Technical Skills
    4. Education
    5. Certifications
    6. Awards / Leadership / Open Source (only if valuable)

    Exclude empty sections.

    If the resume becomes too long:

    - Remove less relevant projects.
    - Reduce bullet count.
    - Remove repetitive information.
    - Shorten summaries.
    - Never reduce readability simply to fit more content.

    ========================
    WRITING STYLE
    ========================

    - Human written
    - Professional
    - Concise
    - Results oriented
    - ATS optimized
    - Action verbs
    - No first-person pronouns
    - No filler
    - No clichés
    - No exaggerated claims

    Each bullet should communicate one meaningful achievement.

    Prefer 3-5 bullets for recent roles and fewer for older roles.

    ========================
    ATS REQUIREMENTS
    ========================

    The resume must be ATS-friendly.

    Requirements:

    - Single-column layout.
    - Semantic HTML.
    - Proper heading hierarchy.
    - No tables for layout.
    - No text inside images.
    - No icons replacing text.
    - Logical reading order.
    - Simple structure.

    ========================
    HTML REQUIREMENTS
    ========================

    Generate a COMPLETE HTML5 document.

    Use ONLY:

    - HTML
    - Inline CSS inside a single <style> tag

    Do NOT use:

    - JavaScript
    - External CSS
    - External fonts
    - Images
    - SVG
    - Canvas
    - Base64 assets
    - CDN resources

    Use:

    font-family: Arial, Helvetica, sans-serif;

    ========================
    PDF REQUIREMENTS
    ========================

    The HTML will be converted to PDF using Puppeteer.

    Include this CSS exactly:

    @page {
        size: A4;
    }

    body {
        margin: 0;
        padding: 0;
        font-family: Arial, Helvetica, sans-serif;
        color: #222;
        line-height: 1.4;
    }

    IMPORTANT:

    - Do NOT specify page margins / paddings inside @page.
    - Do NOT use body margins for printable margins.
    - Puppeteer will provide the page margins.
    - Do NOT use absolute positioning.
    - Avoid overflow.
    - Avoid fixed heights.
    - Avoid page-breaks inside experience entries or projects.
    - Use page-break-inside: avoid where appropriate.

    ========================
    VISUAL DESIGN
    ========================

    Create a clean, modern, minimal design.

    Use:

    - White background
    - Black text
    - One subtle accent color for headings
    - Thin separators
    - Balanced spacing
    - Professional typography

    Recommended typography:

    - Name: 24-28px
    - Section headings: 15-17px
    - Body: 10.5-11.5px

    Keep spacing compact but readable.

    The resume should naturally fit on one A4 page for most candidates.

    The final result should resemble a resume prepared by an experienced recruiter at a top technology company and should convert cleanly into a polished PDF using Puppeteer.
    `;
}
