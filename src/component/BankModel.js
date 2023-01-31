import React from 'react'
import './BankModel.css';
function BankModel() {
    return (
        <div>
            <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Bank</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div class="form-row">
                                    <div class="form-group col-md-12">
                                        <label for="inputName">Account Currency</label>
                                        <select name="" id="" class="form-control">
                                            <option value="1" selected="">Select</option>
                                            <option value="1">SBI</option>
                                            <option value="1">Dena Bank</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-12">
                                        <label for="inputName">Account Type</label>
                                        <select name="" id="" class="form-control">
                                            <option value="1" selected="">Select</option>
                                            <option value="1">Saving</option>
                                            <option value="1">Credit</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-12">
                                        <label for="inputName">Account Number</label>
                                        <input type="text" class="form-control" id="inputemail" />
                                    </div>
                                    <div class="form-group col-md-12">
                                        <label for="inputName">Bank Name</label>
                                        <input type="text" class="form-control" id="inputemail" />
                                    </div>
                                    <div class="form-group col-md-12">
                                        <label for="inputName">Bank Rouing Code</label>
                                        <input type="text" class="form-control" id="inputemail" />
                                    </div>
                                    <div class="form-group col-md-12">
                                        <label for="inputName">Swift Code</label>
                                        <input type="text" class="form-control" id="inputemail" />
                                    </div>
                                    <div class="form-group col-md-12 mb-4">
                                        <label for="inputName">Email Verification Code</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control frm" placeholder="Email Verification Code" aria-label="Email Verification Code" aria-describedby="basic-addon2" />
                                            <div class="input-group-append">
                                                <button type='button' className='apnd'>Request OTP</button>
                                            </div>
                                        </div>
                                        <label for="inputName">Enter the Verification Code Received by the ru******th@gm***om</label>
                                    </div>
                                    <div class="form-group col-md-12 mb-4">
                                        <label for="inputName">SMS Verification Code</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control frm" placeholder="SMS Verification Code" aria-label="SMS Verification Code" aria-describedby="basic-addon2" />
                                            <div class="input-group-append">
                                                <button type='button' className='apnd'>Request OTP</button>
                                            </div>
                                        </div>
                                        <label for="inputName">Enter the Verification Code Received by the 85***31</label>
                                    </div>
                                    <div className='col-lg-12 col-md-12 col-sm-12 col-xl-12'>
                                        <div className='submit-btn'>
                                            <button type='button' className='submit'>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default BankModel