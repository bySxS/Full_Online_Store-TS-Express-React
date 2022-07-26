import React from 'react'
import { Navbar } from 'react-bootstrap'
import Search from './Search/Search'
import Profile from 'components/Header/Profile/Profile'
// import { useAppSelector } from 'hooks/useStore'
// import { countMovies } from 'store/selectors/moviesSelector'
// import { countFavoriteMovie } from 'store/selectors/favouriteMoviesSelectors'
// import { ModuleName } from 'constants/page'

const Header = () => {
  // const countMovie = useAppSelector(countMovies)
  // const countFavouriteMovie = useAppSelector(countFavoriteMovie)

  return (
    <header className={'header fixed-top d-flex align-items-center'}>
      <Navbar fixed={'top'} bg="light" variant="light"
              className={'d-flex align-items-center justify-content-between pl-8'}>
          <Navbar.Brand>
            <i className="bi bi-shop pr-1 text-3xl"></i>
          </Navbar.Brand>

          <Search />

          <Profile />

      </Navbar>
    </header>
  )
}

export default Header
