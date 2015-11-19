import React, {Component, PropTypes} from "react";
import ContentLoading from "../includes/ContentLoading";

class Page extends Component {

    renderPageContent() {
        let {page} = this.props;
        if (page.HasLoaded) {
            return (
                <div dangerouslySetInnerHTML={{__html: page.Content}} />
            );
        }else{
            return <ContentLoading />;
        }
    }

    render() {
        let {page} = this.props;

        return (
            <div className="container">
                <h1>{page.Title}</h1>
                {this.renderPageContent()}
            </div>
        );
    }
}

export default Page;
