type NavigationHeaderProps = {
  name: string;
};

/**
 * A navigation header item on the side navigation.
 * @param props The props of the component.
 */
export default function NavigationHeader(props: NavigationHeaderProps) {
  return (
    <li class="wrapper">
      <h2>{props.name}</h2>
    </li>
  );
}
