import React, {PropTypes, Component} from 'react';
import {NavLink} from 'fluxible-router';

class Header extends Component{

    static PropTypes = {
        pages: PropTypes.array.isRequired,
        siteConfig: PropTypes.object.isRequired
    }

    render(){
        let {siteConfig} = this.props;
        return (
            <div className="container">
                <header className="Header">
                    <div className="Header-siteTitle">
                        <NavLink href="/" className="Header-homeLink">
                            {siteConfig.Title} - {siteConfig.Tagline}
                        </NavLink>
                    </div>
                </header>
                <nav className="Nav">
                    <ol className="Nav-list row">
                        {
                            this.props.pages
                                .filter(page=>page.ParentID === 0 && page.ShowInMenus === 1)
                                .sort((pageA, pageB)=>pageA.Sort > pageB.Sort)
                                .map(page=>(
                                    <li key={page.ID} className="Nav-listItem col-sm-4">
                                        <NavLink
                                            className="Nav-link"
                                            href={page.URL}>
                                            {page.MenuTitle}
                                        </NavLink>
                                    </li>
                                ))
                        }
                    </ol>
                </nav>
            </div>
        );
    }
}

export default Header;
