# Copilot Instructions for World-Wise

## Project Overview

- **World-Wise** is a React app bootstrapped with Vite, using modular components and context for state management.
- The app structure is organized by feature: `components/`, `pages/`, `Context/`, and `hooks/`.
- Data is loaded from local JSON (`data/cities.json`) and managed via React Context (`CitiesContext.jsx`).

## Key Architectural Patterns

- **Component-Driven**: UI is split into small, reusable components (e.g., `CityItem`, `CountryList`, `User`).
- **Context API**: App-wide state (cities, authentication) is managed in `src/Context/` using React Context.
- **Hooks**: Custom hooks in `src/hooks/` encapsulate logic for geolocation and URL position.
- **Pages**: Route-level components live in `src/pages/` (e.g., `HomePage`, `Login`, `AppLayOut`).
- **Styling**: CSS Modules are used for component-scoped styles (e.g., `Button.module.css`).

## Developer Workflows

- **Start Dev Server**: `npm run dev` (Vite, hot reload)
- **Build for Production**: `npm run build`
- **Preview Production Build**: `npm run preview`
- **No built-in test scripts**: Add tests as needed; none present by default.

## Project-Specific Conventions

- **Component Naming**: PascalCase for components and files (e.g., `CityList.jsx`).
- **CSS Modules**: Each component has a matching `.module.css` file for styles.
- **Context Naming**: Context files are in `Context/` and use `*Context.jsx` naming.
- **Hooks Naming**: Custom hooks are in `hooks/` and use `use*` naming.
- **Data**: Static data is in `data/` and loaded at runtime.
- **No Redux/MobX**: Only React Context for state management.

## Integration Points

- **External**: No external API calls by default; all data is local.
- **Assets**: Images and icons are in `public/` and `src/assets/`.

## Examples

- To add a new city, update `data/cities.json` and ensure context logic in `CitiesContext.jsx` supports it.
- To add a new page, create a component in `pages/` and add routing logic if needed.
- To add a new context, follow the pattern in `CitiesContext.jsx` and provide a context provider.

## References

- Main entry: `src/main.jsx`
- App shell: `src/App.jsx`
- Navigation: `src/components/AppNav.jsx`, `src/components/PageNav.jsx`
- State: `src/Context/CitiesContext.jsx`, `src/Context/FackAuthContext.jsx`

---

For more details, see the README.md or explore the `src/` directory for patterns.
