import React from 'react'


const styles = {
    backgroundImage: 'url("https://images.pexels.com/photos/1131458/pexels-photo-1131458.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260")',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    zIndex: -1
}

export default class HomeContainer extends React.Component {

    render(){

        return(
            <div style={styles}>
                <div className="home-container">
                    Hello
                </div>
            </div>
        )
    }
}