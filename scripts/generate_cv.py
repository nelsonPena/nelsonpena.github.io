"""Generate concise public CVs from portfolio data. Requires reportlab."""
import json
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether,
)

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / 'src/data/portfolio.json').read_text(encoding='utf-8'))
OUT = ROOT / 'public/cv'
OUT.mkdir(parents=True, exist_ok=True)
INK = colors.HexColor('#142238')
BLUE = colors.HexColor('#2455d8')
MUTED = colors.HexColor('#566274')
LINE = colors.HexColor('#dde3eb')
WIDTH = A4[0] - 40 * mm


def text(value):
    return escape(value.replace('—', '-').replace('–', '-').replace('’', "'"))


def dates(job, lang):
    months = {
        'en': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        'es': ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    }
    def format_date(value):
        year, month = value.split('-')
        return f'{months[lang][int(month) - 1]} {year}'
    end = format_date(job['end']) if job['end'] else ('Present' if lang == 'en' else 'Actualidad')
    return f"{format_date(job['start'])} - {end}"


def make_cv(lang):
    labels = {
        'en': {'role': 'Senior iOS Developer / Technical Lead', 'profile': 'PROFILE', 'skills': 'CORE SKILLS', 'experience': 'PROFESSIONAL EXPERIENCE', 'continued': 'PROFESSIONAL EXPERIENCE / CONTINUED', 'education': 'EDUCATION', 'contract': 'Independent contract', 'fullTime': 'Full-time', 'note': 'Independent contracts and full-time roles are labeled; some engagements overlap.'},
        'es': {'role': 'Desarrollador iOS senior / Líder técnico', 'profile': 'PERFIL', 'skills': 'HABILIDADES PRINCIPALES', 'experience': 'EXPERIENCIA PROFESIONAL', 'continued': 'EXPERIENCIA PROFESIONAL / CONTINUACIÓN', 'education': 'EDUCACIÓN', 'contract': 'Contrato independiente', 'fullTime': 'Tiempo completo', 'note': 'Se identifican los contratos y cargos de tiempo completo; algunos periodos se solapan.'},
    }[lang]
    base = getSampleStyleSheet()
    styles = {
        'name': ParagraphStyle('Name', fontName='Helvetica-Bold', fontSize=26, leading=31, textColor=INK, spaceAfter=6),
        'role': ParagraphStyle('Role', fontName='Helvetica', fontSize=11.5, leading=15, textColor=BLUE, spaceAfter=8),
        'body': ParagraphStyle('Body', parent=base['BodyText'], fontName='Helvetica', fontSize=9.4, leading=13.4, textColor=INK, spaceAfter=5),
        'section': ParagraphStyle('Section', fontName='Helvetica-Bold', fontSize=9.3, leading=13, textColor=BLUE, spaceBefore=15, spaceAfter=9),
        'company': ParagraphStyle('Company', fontName='Helvetica-Bold', fontSize=11.5, leading=15, textColor=INK),
        'date': ParagraphStyle('Date', fontName='Helvetica', fontSize=8.6, leading=12, textColor=MUTED, alignment=TA_RIGHT),
        'jobrole': ParagraphStyle('JobRole', fontName='Helvetica-Bold', fontSize=9.4, leading=13, textColor=INK, spaceBefore=4, spaceAfter=4),
        'meta': ParagraphStyle('Meta', fontName='Helvetica', fontSize=8.5, leading=12, textColor=MUTED, spaceAfter=4),
        'bullet': ParagraphStyle('Bullet', fontName='Helvetica', fontSize=9.1, leading=12.8, textColor=MUTED, leftIndent=9, firstLineIndent=-9, spaceAfter=3),
    }
    p = lambda value, style='body': Paragraph(text(value), styles[style])
    story = [p(DATA['profile']['name'], 'name'), p(labels['role'], 'role')]
    story += [p(f"{DATA['profile']['email']}  |  github.com/nelsonPena", 'meta'), p('nelsonpena.github.io', 'meta')]
    story += [p(labels['profile'], 'section'), p(DATA['profile']['summary'][lang])]
    story += [p(labels['skills'], 'section')]
    for group in DATA['skillGroups']:
        # Bold headings distinguish native specialization from complementary experience.
        value = f"<b>{text(group['title'][lang])}:</b> {text(' / '.join(group['items']))}"
        story.append(Paragraph(value, styles['body']))
    story += [p(labels['experience'], 'section'), p(labels['note'], 'meta')]

    for index, job in enumerate(DATA['experience']):
        if index == 3:
            story += [PageBreak(), p(DATA['profile']['name'], 'name'), p(labels['continued'], 'section')]
        heading = Table([[p(job['company'], 'company'), p(dates(job, lang), 'date')]], colWidths=[WIDTH * .6, WIDTH * .4])
        heading.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'), ('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (-1, -1), 0), ('TOPPADDING', (0, 0), (-1, -1), 5), ('BOTTOMPADDING', (0, 0), (-1, -1), 0), ('LINEABOVE', (0, 0), (-1, -1), .5, LINE)]))
        block = [heading, p(f"{job['role'][lang]} | {labels[job['kind']]}", 'jobrole'), p(job['description'][lang])]
        block += [p('- ' + value, 'bullet') for value in job['highlights'][lang]]
        block += [Spacer(1, 8)]
        story.append(KeepTogether(block))

    story += [p(labels['education'], 'section')]
    for item in DATA['education']:
        story.append(Paragraph(f"<b>{text(item['program'][lang])}</b> - {text(item['institution'])}", styles['body']))

    def footer(canvas, doc):
        canvas.saveState()
        canvas.setStrokeColor(LINE)
        canvas.line(20 * mm, 17 * mm, A4[0] - 20 * mm, 17 * mm)
        canvas.setFont('Helvetica', 8)
        canvas.setFillColor(MUTED)
        canvas.drawString(20 * mm, 12 * mm, 'Nelson Peña | nelsonpena.github.io')
        canvas.drawRightString(A4[0] - 20 * mm, 12 * mm, f'{lang.upper()} / {doc.page}')
        canvas.restoreState()

    path = OUT / f'nelson-pena-cv-{lang}.pdf'
    doc = SimpleDocTemplate(str(path), pagesize=A4, leftMargin=20 * mm, rightMargin=20 * mm, topMargin=17 * mm, bottomMargin=23 * mm, title=f"Nelson Peña - CV ({lang.upper()})", author='Nelson Peña')
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(path)


if __name__ == '__main__':
    for locale in ('en', 'es'):
        make_cv(locale)
