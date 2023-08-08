import style from './Header.module.sass';
import logo from './logo.svg';
import menu from './menu.svg';
import search from './search.svg';

/**
 * The header of the website.
 */
export default function Header() {
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
              <a href="#">
                <img src={menu} alt="סמל תפריט" />
              </a>
            </li>
            <li>
              <a href="#">פופולרי</a>
            </li>
            <li>
              <a href="#">אודות האתר</a>
            </li>
            <li>
              <a href="#">
                <img src={search} alt="סמל חיפוש" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
