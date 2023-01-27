import React from 'react'

function Emaillogin() {
    return (
        <div>
            <div className='new-login'>
                <div className='row'>
                    <div className='login-left-section'>
                        <div className='row justify-content-center m-0'>
                            <div className='col-lg-10 col-md-9'>
                                <div className='row' style={{ alignItems: 'center' }}>
                                    <div class="col-lg-6 col-md-6">
                                        <div class="login-logo">
                                            <img src="images/logo.png"></img>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                        <div class="sign-link">Don't have a Account? <a href="#">Sign up Now</a></div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-8'>
                                        <div className='frm-section'>
                                            <h2>Log in </h2>
                                            <p>Log in with your Email, Phone number </p>
                                            <div className='start-form'>
                                                <form>
                                                    <div className='form-row'>
                                                        <div className='form-group col-md-12'>
                                                            <input type="text" class="form-control" id="email" placeholder="Enter your email address" />
                                                        </div>
                                                        <div class="form-group col-md-12">
                                                            <input type="password" id="password" class="form-control" placeholder="Enter your password" />
                                                            <button type="button" id="btnToggle" class="toggle"><i id="eyeIcon" class="fa fa-eye"></i></button>
                                                        </div>
                                                    </div>
                                                    <div className='row' style={{ alignItems: 'center' }}>
                                                        <div className='col-lg-6 col-md-6'>
                                                            <a href='#'>Forget Password?</a>
                                                        </div>
                                                        <div className='col-lg-6 col-md-6'>
                                                            <button type="submit" class="forgot-btn">Log In</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="cyp">
                                                <h6>Copyright © 2023 by Byte Exchange all Rights Reserved.</h6>
                                                <p>Disclaimer: The purchase of digital currencies is conducted through Byte Exchange. By accessing this site, you agree to be bound by its Terms of Service and Privacy Policy.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="login-right-img">
                        <img src="images/login.png"></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Emaillogin