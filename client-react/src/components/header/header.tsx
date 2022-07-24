import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import cl from './header.module.scss'
// import { useAppSelector } from 'hooks/useStore'
// import { countMovies } from 'store/selectors/moviesSelector'
// import { countFavoriteMovie } from 'store/selectors/favouriteMoviesSelectors'
// import { ModuleName } from 'constants/page'

const Header = () => {
  // const countMovie = useAppSelector(countMovies)
  // const countFavouriteMovie = useAppSelector(countFavoriteMovie)

  return (
    <div>
      <Navbar fixed={'top'} bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <i className="bi bi-film"></i>{' '}
          </Navbar.Brand>
          <Nav className={ `${cl.menu_text} me-auto` }>
            {/* <NavLink className={ cl.menu_item } to={`/${ModuleName.MOVIES}`}>Movies</NavLink> {` (${countMovie})`} */}
            {/* <NavLink className={ cl.menu_item } to={`/${ModuleName.FAVOURITE_MOVIES}`}>Favourite Movies</NavLink> {` (${countFavouriteMovie})`} */}
            <NavLink className={ cl.menu_item } to={'/loader'}>Test Loader</NavLink>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
