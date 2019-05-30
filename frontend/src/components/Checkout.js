import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

const mapStateToProps = (state) => ({
    products: state.products,
    currentUser: state.currentUser,
    cartItems: state.cartItems
})

const mapDispatchToProps = {
    setCurrentUser: user => {
        return { type: "CURRENT_USER", currentUser: user };
    },
    clearCartItems: () => {
        return { type: "LOAD_TEMPORARY_CART", cartItems: []  };
    }
}

const stripe = window.Stripe('pk_test_gQG3uG8TjA5EMGl138fKHssB004VjKlIdK');


export default connect(mapStateToProps, mapDispatchToProps)(
    class Checkout extends React.Component {

        componentDidMount() {
            const elements = stripe.elements()
            this.card = elements.create('card')
            setTimeout(() => document.querySelector('iframe').style.minWidth = '45%', 500)
            // console.log(document.querySelector('iframe').style.width)
            // console.log('wat', this.card)
            this.card.mount('#card-element')
        }

        render() {

            // const elements = stripe.elements();
            // const cardElement = elements.create('card');
            // cardElement.mount('#card-element');

            const onAdd = async (e) => {
                e.preventDefault()

                const cardholderName = document.getElementById('cardholder-name');
                // const creditCard = document.getElementById('payment');
                // const creditMm = document.getElementById('payment-mm');
                // const creditYy = document.getElementById('payment-yy');
                // const creditCvc = document.getElementById('payment-cvc');

                const { paymentMethod, error } = await stripe.createPaymentMethod('card', this.card, {
                    billing_details: {
                        name: cardholderName.value
                    }
                });
                if (error) {
                    // Show error in payment form
                } else {
                    // Send paymentMethod.id to your server (see Step 2)
                    const response = await fetch(`http://localhost:3000/users/${this.props.currentUser.id}/checkout`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ payment_method_id: paymentMethod.id })
                    });

                    const json = await response.json();

                }
                alert('Transaction completed!')
                this.props.clearCartItems()
                this.props.history.push("/products")
            }

            return (
                // (!this.props.currentUser ? 
                //     <div>
                //         <h1>Please log in first.</h1>
                //         <Link to="/new">
                //             <button>Login</button>
                //         </Link>

                //     </div>
                //     : 
                <div className="checkout-form-container">
                    <form>
                        <div className="checkout-form">
                            <h1>Checkout</h1>
                            <br/>
                            <label for="cardholder-name"><b>Full Name</b></label><br />
                            <input id="cardholder-name" name="cardholder-name" type="text" placeholder="Ex. John Smith" style={{ width: '200px' }} /><br /><br />

                            {/* <!-- placeholder for Elements --> */}
                            <div style={{"margin-left": "36%"}}>
                                <div id="card-element">
                                    {/* <label for="payment"><b>Credit Card Number</b></label><br />
                                    <input id="payment" name="payment" type="text" placeholder="Please do not include spaces/dashes" style={{ width: '200px' }} /><br /><br />

                                    <label for="payment-mm"><b>Month</b></label><br />
                                    <input id="payment-mm" name="payment-mm" type="text" placeholder="MM" style={{ width: '200px' }} /><br /><br />

                                    <label for="payment-yy"><b>Year</b></label><br />
                                    <input id="payment-yy" name="payment-yy" type="text" placeholder="YY" style={{ width: '200px' }} /><br /><br />

                                    <label for="payment-cvc"><b>CVC</b></label><br />
                                    <input id="payment-cvc" name="payment-cvc" type="text" placeholder="CVC" style={{ width: '200px' }} /><br /><br /> */}

                                </div>
                            </div>
                            <br/>
                            <Button variant="outlined" size="small" color="primary" style={{textDecoration: 'none', color: 'black', marginLeft: '10px', cursor: 'pointer', marginBottom: '50px'}} onClick={onAdd} id="card-button" data-secret="{{ client_secret }}">
                                Submit Payment
                                </Button>
                        </div>
                    </form>
                </div>
                // )
            )
        }
    }
)