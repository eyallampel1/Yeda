import style from './Header.module.sass';
import logo from './logo.svg';
import menu from './menu.svg';
import search from './search.svg';
import theme from './theme.svg';
import { useState, useEffect, useRef } from 'preact/hooks';
import { JSX } from 'preact';
import { termsData } from '~/pages/term/termsData';
import ITerm from '~/models/ITerm';
import { getCurrentUrl, route } from 'preact-router';

interface HeaderProps {
  searchTerm: string;
  setFilteredTerms: (terms: ITerm[]) => void;
  setSearchTerm: (term: string) => void;
  toggleSideNav: () => void;
  toggleTheme: () => void;
}

/**
 * The header of the website.
 */
export default function Header(props: HeaderProps) {
  const handleOnMenuClick = () => {
    props.toggleSideNav();
  };

  const handleOnThemeClick = () => {
    props.toggleTheme();
  };

  const [localSearchTerm, setLocalSearchTerm] = useState('');

  const previousUrlRef = useRef<string | null>(null);
  const [filteredTerms, setFilteredTerms] = useState<ITerm[]>([]);
  const [selectedTermIndex, setSelectedTermIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    const currentUrl = getCurrentUrl();
    if (previousUrlRef.current !== currentUrl) {
      console.log(
        'Route has changed from:',
        previousUrlRef.current,
        'to:',
        currentUrl
      );
      setLocalSearchTerm('');
      previousUrlRef.current = currentUrl;
    }
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        setSelectedTermIndex(prev =>
          prev === null || prev >= filteredTerms.length - 1 ? 0 : prev + 1
        );
      } else if (e.key === 'ArrowUp') {
        setSelectedTermIndex(prev =>
          prev === null || prev <= 0 ? filteredTerms.length - 1 : prev - 1
        );
      } else if (e.key === 'Enter' && selectedTermIndex !== null) {
        const term = filteredTerms[selectedTermIndex];
        route(`/${term.urlPath}`);
        setLocalSearchTerm('');
        setFilteredTerms([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [filteredTerms, selectedTermIndex]);

  return (
    <header class={style.header}>
      <div class={style.headerTop}>
        <div className="wrapper">
          <a class={style.logo} href="/">
            <img src={logo} alt="סמל ידע" />
          </a>
        </div>
      </div>
      <div class={style.headerBottom}>
        <nav className="wrapper">
          <ul>
            <li>
              <button type="button" onClick={handleOnMenuClick}>
                <img src={menu} alt="סמל תפריט" />
              </button>
            </li>
            <li>
              <a href="#">פופולרי</a>
            </li>
            <li>
              <a href="#">אודות האתר</a>
            </li>
            <li>
              <input
                type="text"
                value={localSearchTerm}
                onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
                  const targetValue = (e.target as HTMLInputElement).value;
                  setLocalSearchTerm(targetValue);

                  if (targetValue.trim() === '') {
                    props.setFilteredTerms([]);
                    return;
                  }

                  props.setSearchTerm(targetValue);

                  const results = termsData.filter(term =>
                    term.displayName.includes(targetValue)
                  );

                  props.setFilteredTerms(results);
                }}
                placeholder="חיפוש..."
              />

              <button type="button">
                <img src={search} alt="סמל חיפוש" />
              </button>
              <button type="button" onClick={handleOnThemeClick}>
                <img src={theme} alt="סמל ערכת נושא" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {filteredTerms.length > 0 && (
        <div className={style.searchResultsOverlay}>
          {filteredTerms.map((term, index) => (
            <div
              key={term.urlPath}
              style={
                index === selectedTermIndex
                  ? { backgroundColor: 'var(--bg-color-tertiary)' }
                  : {}
              }
              className={
                index === selectedTermIndex ? `${style.selectedTerm}` : ''
              }
              onClick={() => {
                route(`/${term.urlPath}`);
                setLocalSearchTerm('');
                setFilteredTerms([]);
              }}
              dangerouslySetInnerHTML={{
                __html: highlightTerm(term.displayName, localSearchTerm),
              }}
            />
          ))}
        </div>
      )}
    </header>
  );
}
