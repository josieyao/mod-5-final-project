import React from 'react'

export default class ImageContainer extends React.Component {

    render(){

        return(
            <div className="image-container">
                <div className="slider">
                    <slide><p>There is no Planet B.</p></slide>
                    <slide><p>Reduce, Reuse, Recycle, Refuse, Rot</p></slide>
                    <slide><p>Every little bit counts.</p></slide>
                    <slide><p>Earth provides enough to satisfy every man’s need, but not every man’s greed.</p></slide>
                </div>
            </div>
        )
        }
    }