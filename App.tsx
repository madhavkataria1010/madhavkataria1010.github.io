import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { BLOG_POSTS, PAPERS, PROJECTS } from './constants';

type Theme = 'light' | 'dark';

type TerminalEntry = {
  command: string;
  output: string;
};

const EMAIL = 'mailto:madhavkataria69@gmail.com';
const GITHUB = 'https://github.com/madhavkataria1010';
const LINKEDIN = 'https://www.linkedin.com/in/madhavkataria/';
const TWITTER = 'https://twitter.com/madhav_kataria';
const SCHOLAR = 'https://scholar.google.com/citations?user=wC2Wm9gAAAAJ&hl=en';
const CV_URL = '/madhav-kataria-cv.pdf';
const ABOUT_AVATAR = '/gibli.jpeg';
const SITE_HOST = 'madhavkataria.com';

const NAV_ITEMS = [
  { to: '/', label: 'about', end: true },
  { to: '/projects', label: 'projects' },
  { to: '/research', label: 'research' },
  { to: '/blogs', label: 'blog' },
  { href: CV_URL, label: 'cv' },
  { to: '/contact', label: 'contact' },
] as const;

const PROJECT_BADGES: Record<string, string> = {
  'Generative Audio': 'AUDIO',
  'Autonomous Agents': 'AGENT',
  'Retrieval Systems': 'RAG',
  'Procedural Generation': 'SYSTEM',
  'Computer Vision': 'VISION',
  'AI Agents': 'AGENT',
  HPC: 'HPC',
};

const formatIndex = (value: number) => String(value + 1).padStart(2, '0');

const getBootTime = () => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  });

  return formatter.format(new Date());
};

const getThemeStorageValue = (): Theme => {
  if (typeof document === 'undefined') {
    return 'dark';
  }

  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
};

const getProjectBadge = (category: string) => PROJECT_BADGES[category] ?? category.toUpperCase();

const getProjectStatus = (hasSource: boolean) => (hasSource ? 'PUBLIC' : 'PRIVATE');

const getBlogFileName = (slug: string) => `${slug.replace(/-/g, '_')}.txt`;

const getLinkToneClass = (label: string) => {
  const normalized = label.trim().toLowerCase();

  if (normalized === 'code') {
    return 'link-tone-code';
  }

  if (normalized === 'arxiv') {
    return 'link-tone-arxiv';
  }

  if (normalized.includes('scholar')) {
    return 'link-tone-scholar';
  }

  if (normalized.includes('origin')) {
    return 'link-tone-origin';
  }

  return 'link-tone-default';
};

const getTerminalHelp = () =>
  [
    'commands:',
    'about      -> open about page',
    'projects   -> open projects page',
    'research   -> open research page',
    'blog       -> open blog page',
    'contact    -> open contact page',
    'cv         -> open CV PDF',
    'email      -> compose email',
    'github     -> open github',
    'linkedin   -> open linkedin',
    'clear      -> clear output',
  ].join('\n');

const openInNewTab = (href: string) => {
  window.open(href, '_blank', 'noopener,noreferrer');
};

const BootHeader = ({ lines }: { lines: Array<{ kind: 'ok' | 'info'; text: React.ReactNode }> }) => (
  <div className="boot-header">
    {lines.map((line, index) => (
      <div key={index} className="boot-line">
        <span className={line.kind === 'ok' ? 'ok' : 'warn'}>
          {line.kind === 'ok' ? '[  OK  ]' : '[ INFO ]'}
        </span>{' '}
        {line.text}
      </div>
    ))}
  </div>
);

const SectionCommand = ({
  command,
  flag,
  arg,
  trailing,
}: {
  command: string;
  flag?: string;
  arg?: string;
  trailing?: string;
}) => (
  <div className="section-cmd">
    <span className="dollar">$</span>
    <span className="cmd">{command}</span>
    {flag ? <span className="flag">{flag}</span> : null}
    {arg ? <span className="arg">{arg}</span> : null}
    {trailing ? <span className="trail">{trailing}</span> : null}
  </div>
);

const TextBlock = ({ children }: { children: React.ReactNode }) => <div className="block">{children}</div>;

const PromptFooter = ({ prompt }: { prompt: string }) => (
  <div className="terminal-prompt static-prompt">
    <span className="ps1">{prompt}</span>
    <span className="prompt-copy">type 'help'</span>
  </div>
);

const RowList = ({ children }: { children: React.ReactNode }) => <div className="row-list">{children}</div>;

const ExpandableRow = ({
  index,
  title,
  leftMeta,
  rightBadge,
  rightMeta,
  selected,
  onClick,
}: {
  index: number;
  title: string;
  leftMeta?: string;
  rightBadge?: string;
  rightMeta?: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <button type="button" className={`row-item ${selected ? 'selected' : ''}`} onClick={onClick}>
    <span className="row-index">{formatIndex(index)}</span>
    <span className="row-title">{title}</span>
    <span className="row-right">
      {leftMeta ? <span className="row-meta row-meta-left">{leftMeta}</span> : null}
      {rightBadge ? <span className="row-badge">{rightBadge}</span> : null}
      {rightMeta ? <span className="row-meta">{rightMeta}</span> : null}
      <span className="row-arrow">{selected ? '▾' : '▸'}</span>
    </span>
  </button>
);

const InlineExpansion = ({
  metaLine,
  body,
  links,
  tags,
}: {
  metaLine?: React.ReactNode;
  body: string;
  links?: Array<{ label: string; href: string }>;
  tags?: string[];
}) => (
  <div className="row-expansion">
    {metaLine ? <div className="row-expansion-meta">{metaLine}</div> : null}
    <p className="row-expansion-copy">{body}</p>
    {tags && tags.length > 0 ? (
      <div className="row-expansion-tags">
        {tags.map((tag) => (
          <span key={tag} className="row-expansion-tag">
            {tag}
          </span>
        ))}
      </div>
    ) : null}
    {links && links.length > 0 ? (
      <div className="row-expansion-links">
        {links.map((link, index) => (
          <React.Fragment key={`${link.label}-${link.href}`}>
            {index > 0 ? <span className="row-expansion-sep">→</span> : null}
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className={`row-expansion-link ${getLinkToneClass(link.label)}`}
            >
              {link.label}
            </a>
          </React.Fragment>
        ))}
      </div>
    ) : null}
  </div>
);

const SimpleMarkdown = ({ content }: { content: string }) => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];

  lines.forEach((line, index) => {
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${index}`} className="article-code">
            <code>{codeBlockContent.join('\n')}</code>
          </pre>,
        );
        codeBlockContent = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      return;
    }

    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={index} className="article-heading article-heading-1">
          {line.slice(2)}
        </h1>,
      );
      return;
    }

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={index} className="article-heading article-heading-2">
          {line.slice(3)}
        </h2>,
      );
      return;
    }

    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={index} className="article-heading article-heading-3">
          {line.slice(4)}
        </h3>,
      );
      return;
    }

    if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={index} className="article-quote">
          {line.slice(2)}
        </blockquote>,
      );
      return;
    }

    if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
      const listText = line.trim().slice(2);
      const parts = listText.split(/(\*\*.*?\*\*)/g);
      const parsedListText = parts.map((part, partIndex) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={partIndex} className="article-strong">
              {part.slice(2, -2)}
            </strong>
          );
        }

        return part;
      });

      elements.push(
        <div key={index} className="article-list-item">
          <span className="article-list-mark">-</span>
          <span>{parsedListText}</span>
        </div>,
      );
      return;
    }

    if (line.trim().length > 0) {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const parsedLine = parts.map((part, partIndex) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={partIndex} className="article-strong">
              {part.slice(2, -2)}
            </strong>
          );
        }

        const codeParts = part.split(/(`.*?`)/g);
        return codeParts.map((codePart, codeIndex) => {
          if (codePart.startsWith('`') && codePart.endsWith('`')) {
            return (
              <code key={`${partIndex}-${codeIndex}`} className="article-inline-code">
                {codePart.slice(1, -1)}
              </code>
            );
          }

          return codePart;
        });
      });

      elements.push(
        <p key={index} className="article-paragraph">
          {parsedLine}
        </p>,
      );
    }
  });

  return <div>{elements}</div>;
};

const TerminalConsole = ({
  entries,
  value,
  onChange,
  onSubmit,
}: {
  entries: TerminalEntry[];
  value: string;
  onChange: (nextValue: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) => (
  <>
    <div className="terminal-prompt">
      <span className="ps1">madhav@home:~$</span>
      <form className="terminal-form" onSubmit={onSubmit}>
        <input
          type="text"
          className="t-input"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="type 'help'"
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
    <div className="t-response">
      {entries.map((entry, index) => (
        <div key={`${entry.command}-${index}`} className="terminal-entry">
          <div className="terminal-entry-command">
            <span className="ps1">madhav@home:~$</span> {entry.command}
          </div>
          <pre>{entry.output}</pre>
        </div>
      ))}
    </div>
  </>
);

const AboutPage = ({
  terminalEntries,
  terminalInput,
  setTerminalInput,
  handleTerminalSubmit,
}: {
  terminalEntries: TerminalEntry[];
  terminalInput: string;
  setTerminalInput: React.Dispatch<React.SetStateAction<string>>;
  handleTerminalSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) => {
  const previewResearchRows = [
    {
      id: 'preview-paper',
      leftLabel: `${PAPERS[0]?.conference ?? 'ICCV'} ${PAPERS[0]?.year ?? '2025'}`,
      title: PAPERS[0]?.title ?? 'Featured paper',
      badge: 'PAPER',
      to: '/research',
    },
    {
      id: 'preview-project-1',
      leftLabel: getProjectBadge(PROJECTS[0]?.category ?? 'SYSTEM'),
      title: PROJECTS[0]?.title ?? 'Featured project',
      badge: 'PROJECT',
      to: '/projects',
    },
    {
      id: 'preview-project-2',
      leftLabel: getProjectBadge(PROJECTS[1]?.category ?? 'SYSTEM'),
      title: PROJECTS[1]?.title ?? 'Second featured project',
      badge: 'PROJECT',
      to: '/projects',
    },
  ];

  return (
    <>
      <BootHeader
        lines={[
          { kind: 'ok', text: <>Starting session - <span className="path">{SITE_HOST}</span></> },
          { kind: 'ok', text: 'User profile loaded' },
          { kind: 'info', text: <>Last login: {getBootTime()}</> },
        ]}
      />

      <SectionCommand command="whois" arg="madhav" />
      <div className="who-block">
        <div className="who-photo-col">
          <div className="photo-frame">
            <img src={ABOUT_AVATAR} alt="Madhav Kataria" className="profile-photo" />
          </div>
        </div>
        <div className="who-text-col">
          <div className="who-field"><span className="who-key">name</span><span className="who-sep">:</span> <span className="who-val bright">Madhav Kataria</span></div>
          <div className="who-field"><span className="who-key">role</span><span className="who-sep">:</span> <span className="who-val">AI researcher & developer</span></div>
          <div className="who-field"><span className="who-key">org</span><span className="who-sep">:</span> <span className="who-val accent">independent research + product engineering</span></div>
          <div className="who-field"><span className="who-key">focus</span><span className="who-sep">:</span> <span className="who-val">vision-language models, generative AI, Large language models</span></div>
          <div className="who-field"><span className="who-key">&nbsp;</span><span className="who-sep"> </span> <span className="who-val">agentic systems, evaluation, fast inference</span></div>
          <div className="who-field"><span className="who-key">builds</span><span className="who-sep">:</span> <span className="who-val">voice agents, browser agents, RAG pipelines, CV systems</span></div>
        </div>
      </div>

      <SectionCommand command="cat" arg="about.txt" />
      <TextBlock>
        <p>
          My name is Madhav, and I build AI systems across research and product contexts, with a focus on
          vision-language models, agentic workflows, multimodal reasoning, and practical generative AI systems.
        </p>
        <p>
          I enjoy moving ideas beyond the prototype phase: reducing latency, making orchestration cleaner,
          strengthening retrieval, and turning demo-heavy concepts into systems that feel disciplined enough to ship.
        </p>
        <p>
          Recent work spans real-time voice assistants, autonomous browser systems, dynamic retrieval pipelines,
          adversarially robust vision projects, and low-level performance-oriented neural network engineering.
        </p>
      </TextBlock>

      <SectionCommand command="cat" arg="links.txt" />
      <div className="contact-row">
        <a href={EMAIL} className="contact-chip">✉ email</a>
        <a href={SCHOLAR} target="_blank" rel="noreferrer" className="contact-chip">◈ scholar</a>
        <a href={LINKEDIN} target="_blank" rel="noreferrer" className="contact-chip">⬡ linkedin</a>
        <a href={GITHUB} target="_blank" rel="noreferrer" className="contact-chip">⌥ github</a>
        <a href={TWITTER} target="_blank" rel="noreferrer" className="contact-chip">✗ twitter</a>
      </div>

      <SectionCommand command="tail" flag="-n 10" arg="updates.log" />
      <div className="log-block">
        <div className="log-entry">
          <span className="log-ts">2026-04</span>
          <span className="log-lvl new">NEW</span>
          <span className="log-msg">Rebuilt the portfolio around a routed terminal-style interface.</span>
        </div>
        <div className="log-entry">
          <span className="log-ts">2025-10</span>
          <span className="log-lvl note">NOTE</span>
          <span className="log-msg">Continued writing on agentic systems, crypto infrastructure, and system design.</span>
        </div>
        <div className="log-entry">
          <span className="log-ts">2025-08</span>
          <span className="log-lvl paper">PAPER</span>
          <span className="log-msg">Published Re:Verse — Can Your VLM Read a Manga? at ICCV 2025.</span>
        </div>
      </div>

      <SectionCommand command="ls" flag="-lt" arg="./research/" trailing="| head -3" />
      <div className="mini-papers">
        {previewResearchRows.map((row) => (
          <Link key={row.id} to={row.to} className="mini-paper teaser-row">
            <span className="teaser-left">{row.leftLabel}</span>
            <span className="mini-title-link">{row.title}</span>
            <span className="mini-badge boxed">{row.badge}</span>
          </Link>
        ))}
        <div className="mini-more">
          <Link to="/research">$ ls ./research/ — view all →</Link>
        </div>
      </div>

      <TerminalConsole
        entries={terminalEntries}
        value={terminalInput}
        onChange={setTerminalInput}
        onSubmit={handleTerminalSubmit}
      />
    </>
  );
};

const ProjectsPage = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  return (
    <>
      <BootHeader
        lines={[
          { kind: 'ok', text: <>Loaded <span className="path">{SITE_HOST}/projects</span></> },
          { kind: 'ok', text: <>Mounted projects index - {PROJECTS.length} entries found</> },
          { kind: 'info', text: 'Select any row to inspect stack, context, and links' },
        ]}
      />

      <SectionCommand command="ls" flag="-lt" arg="./projects/" />
      <RowList>
        {PROJECTS.map((project, index) => (
          <React.Fragment key={project.id}>
            <ExpandableRow
              index={index}
              title={project.title}
              rightBadge={getProjectBadge(project.category)}
              rightMeta={getProjectStatus(Boolean(project.githubUrl))}
              selected={selectedIndex === index}
              onClick={() => setSelectedIndex((current) => (current === index ? null : index))}
            />
            {selectedIndex === index ? (
              <InlineExpansion
                metaLine={
                  <>
                    <span className="row-expansion-highlight">{project.category}</span>
                    <span>{project.metrics ?? 'Active build'}</span>
                  </>
                }
                body={project.description}
                tags={project.techStack}
                links={
                  project.detailLinks ??
                  (project.githubUrl
                    ? [
                        {
                          label: 'code',
                          href: project.githubUrl,
                        },
                      ]
                    : undefined)
                }
              />
            ) : null}
          </React.Fragment>
        ))}
      </RowList>

      <PromptFooter prompt="madhav@projects:~$" />
    </>
  );
};

const ResearchPage = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  return (
    <>
      <BootHeader
        lines={[
          { kind: 'ok', text: <>Loaded <span className="path">{SITE_HOST}/research</span></> },
          { kind: 'ok', text: <>Mounted publications index - {PAPERS.length} entries found</> },
          { kind: 'info', text: 'Click any entry to inspect abstract and links' },
        ]}
      />

      <SectionCommand command="cat" arg="research_statement.txt" />
      <TextBlock>
        <p>
          My research focuses on vision and language systems with an emphasis on multimodal reasoning,
          evaluation, retrieval-augmented behavior, and practical methods for building stronger AI systems.
        </p>
        <p>
          Across projects, a recurring theme is the behavior of models in realistic settings: not only how
          they perform on benchmarks, but how they fail, recover, retrieve, and coordinate when used as part
          of larger product or agent pipelines.
        </p>
        <p>
          I am especially interested in research that can cross the boundary into implementation: models and
          methods that are not just publishable, but operationally useful.
        </p>
      </TextBlock>

      <SectionCommand command="ls" flag="-lt" arg="./publications/" />
      <RowList>
        {PAPERS.map((paper, index) => (
          <React.Fragment key={paper.id}>
            <ExpandableRow
              index={index}
              title={paper.title}
              rightBadge={paper.conference}
              rightMeta={paper.year}
              selected={selectedIndex === index}
              onClick={() => setSelectedIndex((current) => (current === index ? null : index))}
            />
            {selectedIndex === index ? (
              <InlineExpansion
                metaLine={
                  paper.authors && paper.authors.length > 0 ? (
                    <>
                      {paper.authors.map((author, authorIndex) => (
                        <React.Fragment key={author}>
                          {authorIndex > 0 ? <span className="row-expansion-author-sep">, </span> : null}
                          <span className={authorIndex === 0 ? 'row-expansion-highlight' : undefined}>{author}</span>
                        </React.Fragment>
                      ))}
                    </>
                  ) : (
                    <>
                      <span className="row-expansion-highlight">Madhav Kataria</span>
                      <span className="row-expansion-author-sep">, </span>
                      <span>collaborators</span>
                    </>
                  )
                }
                body={paper.abstract}
                links={[
                  ...(paper.codeUrl
                    ? [
                        {
                          label: 'code',
                          href: paper.codeUrl,
                        },
                      ]
                    : []),
                  ...(paper.link
                    ? [
                        {
                          label: 'arXiv',
                          href: paper.link,
                        },
                      ]
                    : []),
                ]}
              />
            ) : null}
          </React.Fragment>
        ))}
      </RowList>

      <PromptFooter prompt="madhav@research:~$" />
    </>
  );
};

const BlogPage = () => (
  <>
    <BootHeader
      lines={[
        { kind: 'ok', text: <>Mounted <span className="path">{SITE_HOST}/blogs</span></> },
        { kind: 'ok', text: <>Published posts index - {BLOG_POSTS.length} entries queued</> },
        { kind: 'info', text: <>Reading: <span className="path">posts/{getBlogFileName(BLOG_POSTS[0]?.slug ?? 'latest')}</span></> },
      ]}
    />

    <SectionCommand command="ls" flag="-lt" arg="./posts/" />
    <RowList>
      {BLOG_POSTS.map((post, index) => (
        <Link key={post.id} to={`/blogs/${post.slug}`} className="row-link">
          <div className="row-item">
            <span className="row-index">{formatIndex(index)}</span>
            <span className="row-title">{post.title}</span>
            <span className="row-right">
              <span className="row-meta">{post.date}</span>
            </span>
          </div>
        </Link>
      ))}
    </RowList>
  </>
);

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = useMemo(() => BLOG_POSTS.find((entry) => entry.slug === slug), [slug]);
  const selectedIndex = useMemo(
    () => BLOG_POSTS.findIndex((entry) => entry.slug === slug),
    [slug],
  );

  if (!post) {
    return <Navigate to="/blogs" replace />;
  }

  return (
    <>
      <BootHeader
        lines={[
        { kind: 'ok', text: <>Mounted <span className="path">{SITE_HOST}/blogs</span></> },
        { kind: 'ok', text: 'Opened post buffer' },
        { kind: 'info', text: <>Reading: <span className="path">posts/{getBlogFileName(post.slug)}</span></> },
      ]}
    />

      <SectionCommand command="ls" flag="-lt" arg="./posts/" />
      <RowList>
        {BLOG_POSTS.map((entry, index) => (
          <Link key={entry.id} to={`/blogs/${entry.slug}`} className="row-link">
            <div className={`row-item ${selectedIndex === index ? 'selected' : ''}`}>
              <span className="row-index">{formatIndex(index)}</span>
              <span className="row-title">{entry.title}</span>
              <span className="row-right">
                <span className="row-meta">{entry.date}</span>
              </span>
            </div>
          </Link>
        ))}
      </RowList>

      <SectionCommand command="less" arg={`posts/${getBlogFileName(post.slug)}`} />
      <div className="editor-window">
        <div className="editor-topbar">
          <div className="editor-lights">
            <span className="editor-light red" />
            <span className="editor-light amber" />
            <span className="editor-light green" />
          </div>
          <div className="editor-filename">posts/{getBlogFileName(post.slug)}</div>
          <div className="editor-lines">{post.content.split('\n').length} lines</div>
        </div>
        <div className="editor-body">
          <div className="editor-gutter" aria-hidden="true">
            {Array.from({ length: 16 }, (_, index) => (
              <span key={index}>{index + 1}</span>
            ))}
          </div>
          <div className="editor-content">
            <div className="editor-header">
              <Link to="/blogs" className="terminal-link">
                ← back to posts
              </Link>
              <h1>{post.title}</h1>
              <div className="editor-meta">
                <span>author Madhav Kataria</span>
                <span>date {post.date}</span>
                <span>read {post.readTime}</span>
                <Link to="/blogs" className="editor-origin-link link-tone-origin">
                  origin blog →
                </Link>
              </div>
            </div>
            <div className="chip-row article-chips">
              {post.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
            <SimpleMarkdown content={post.content} />
          </div>
        </div>
      </div>
    </>
  );
};

const ContactPage = () => (
  <>
    <BootHeader
      lines={[
        { kind: 'ok', text: <>Loaded <span className="path">{SITE_HOST}/contact</span></> },
        { kind: 'ok', text: 'Reachability checks passed' },
        { kind: 'info', text: 'Open to research collaboration, engineering work, and consulting' },
      ]}
    />

    <SectionCommand command="cat" arg="contact.txt" />
    <TextBlock>
      <p>
        If you want to collaborate on research, build ambitious AI systems, or talk through product and
        infrastructure work around multimodal models, feel free to reach out.
      </p>
      <p>
        Email is the cleanest path, but LinkedIn and GitHub are here as well if that fits better.
      </p>
    </TextBlock>

    <SectionCommand command="cat" arg="links.txt" />
    <div className="contact-table">
      <div className="contact-line"><span className="contact-index">01</span><span className="contact-label">email</span><a href={EMAIL} className="contact-value">madhavkataria69@gmail.com</a></div>
      <div className="contact-line"><span className="contact-index">02</span><span className="contact-label">scholar</span><a href={SCHOLAR} target="_blank" rel="noreferrer" className="contact-value">google scholar</a></div>
      <div className="contact-line"><span className="contact-index">03</span><span className="contact-label">linkedin</span><a href={LINKEDIN} target="_blank" rel="noreferrer" className="contact-value">linkedin.com/in/madhavkataria</a></div>
      <div className="contact-line"><span className="contact-index">04</span><span className="contact-label">github</span><a href={GITHUB} target="_blank" rel="noreferrer" className="contact-value">github.com/madhavkataria1010</a></div>
      <div className="contact-line"><span className="contact-index">05</span><span className="contact-label">twitter</span><a href={TWITTER} target="_blank" rel="noreferrer" className="contact-value">@madhav_kataria</a></div>
    </div>
  </>
);

const Layout = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<Theme>(getThemeStorageValue);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalEntries, setTerminalEntries] = useState<TerminalEntry[]>([
    {
      command: 'help',
      output: getTerminalHelp(),
    },
  ]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const handleTerminalSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const rawValue = terminalInput.trim();
    if (!rawValue) {
      return;
    }

    const value = rawValue.toLowerCase();

    if (value === 'clear') {
      setTerminalEntries([]);
      setTerminalInput('');
      return;
    }

    let output = `command not found: ${rawValue}`;

    if (value === 'help') {
      output = getTerminalHelp();
    } else if (value === 'about') {
      output = 'open /';
      navigate('/');
    } else if (value === 'projects') {
      output = 'open /projects';
      navigate('/projects');
    } else if (value === 'research') {
      output = 'open /research';
      navigate('/research');
    } else if (value === 'blog' || value === 'writing') {
      output = 'open /blogs';
      navigate('/blogs');
    } else if (value === 'contact') {
      output = 'open /contact';
      navigate('/contact');
    } else if (value === 'cv' || value === 'resume') {
      output = 'opening CV PDF...';
      openInNewTab(CV_URL);
    } else if (value === 'email') {
      output = 'opening mail client...';
      window.location.href = EMAIL;
    } else if (value === 'github') {
      output = 'opening github...';
      openInNewTab(GITHUB);
    } else if (value === 'linkedin') {
      output = 'opening linkedin...';
      openInNewTab(LINKEDIN);
    } else if (value === 'pwd') {
      output = '/madhav';
    } else if (value === 'ls') {
      output = 'about.txt  projects/  research/  posts/  contact.txt  madhav-kataria-cv.pdf';
    }

    setTerminalEntries((entries) => [...entries, { command: rawValue, output }]);
    setTerminalInput('');
  };

  return (
    <div className="shell">
      <nav className="top-nav">
        <span className="nav-prefix">~/madhav</span>
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              {'to' in item ? (
                <NavLink to={item.to} end={item.end}>
                  {item.label}
                </NavLink>
              ) : (
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="theme-toggle"
          onClick={() => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))}
          aria-label="toggle theme"
        >
          <span className="toggle-track">
            <span className="toggle-thumb" />
          </span>
        </button>
      </nav>

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <AboutPage
                terminalEntries={terminalEntries}
                terminalInput={terminalInput}
                setTerminalInput={setTerminalInput}
                handleTerminalSubmit={handleTerminalSubmit}
              />
            }
          />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blogs/:slug" element={<BlogPostPage />} />
          <Route path="/blog" element={<Navigate to="/blogs" replace />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="site-footnote">© 2026 Madhav Kataria. All rights reserved.</footer>
    </div>
  );
};

const App: React.FC = () => <Layout />;

export default App;
