// Add published project Pages here, in recommendation order.
// Example shape: { title: 'Project name', description: 'Short description', url: 'https://…' }
const projects = [];

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.querySelector('#motion-toggle');
let paused = reducedMotion.matches;
function updateMotion() {
  document.documentElement.dataset.paused = String(paused);
  motionButton.textContent = paused ? '动效：关' : '动效：开';
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.setAttribute('aria-label', paused ? '开启动效' : '暂停动效');
  motionButton.disabled = reducedMotion.matches;
  motionButton.title = reducedMotion.matches ? '已遵循系统减少动态效果设置' : '';
}
motionButton.addEventListener('click', () => { paused = !paused; updateMotion(); });
reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches; updateMotion(); });
updateMotion();

const validProjects = projects.filter(project => {
  try { return project.title && new URL(project.url).protocol === 'https:'; }
  catch { return false; }
});
if (validProjects.length) {
  const cards = validProjects.map((project, index) => {
    const card = document.createElement('a');
    card.className = 'project-card panel';
    card.href = project.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    const label = document.createElement('span');
    label.className = 'project-label';
    label.textContent = String(index + 1).padStart(2, '0');
    const arrow = document.createElement('span');
    arrow.className = 'project-arrow';
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '↗';
    const title = document.createElement('h3');
    title.textContent = project.title;
    const description = document.createElement('p');
    description.textContent = project.description || '';
    card.append(label, arrow, title, description);
    return card;
  });
  document.querySelector('#project-list').replaceChildren(...cards);
}
document.querySelector('#project-count').textContent = String(validProjects.length).padStart(2, '0');
