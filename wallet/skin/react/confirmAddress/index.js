import React, { Component } from 'react';
import ConfirmAddressHelper from './helper';

// Setup CSS Module
import classNames from 'classnames/bind';
import style from '../../static/style/index.module.css';
var cx = classNames.bind(style);

const ERROR = 'Cannot load addresses';
const LIMIT = 6, PAGE = 0;
const DEFAULT_HD_PATH = "m/44'/60'/0'/0";

const DEFAULT_STATE = {
  addressList: [],
  i: 0,
  dpath: DEFAULT_HD_PATH,
  limit: LIMIT,
  page: PAGE,
  loading: false,
  error: null,
}


class ConfirmAddress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...DEFAULT_STATE
    }

    this.done = this.props.done;

    this.getAddress = this.getAddress.bind(this);
    this.onDpath = this.onDpath.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onPage = this.onPage.bind(this);
  }

  getAddress(data, limit, page, callback) {
    if (data.wallet === 'isoxys') {
      ConfirmAddressHelper.getAddressByIsoxys(data, this.state.dpath, limit, page).then(re => {
        return callback(null, re);
      }).catch(er => {
        if (er) return callback(ERROR, null);
      });
    }
    else if (data.wallet === 'ledger') {
      ConfirmAddressHelper.getAddressByLedger(data, this.state.dpath, limit, page).then(re => {
        return callback(null, re);
      }).catch(er => {
        if (er) return callback(ERROR, null);
      });
    }
    else if (data.wallet === 'trezor') {
      ConfirmAddressHelper.getAddressByTrezor(data, this.state.dpath, limit, page).then(re => {
        return callback(null, re);
      }).catch(er => {
        if (er) return callback(ERROR, null);
      });
    }
    else {
      return callback(ERROR, null);
    }
  }

  /**
   * UI controllers
   */

  onDpath(e) {
    this.setState({ dpath: e.target.value }, () => {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.setState({ loading: true }, () => {
          this.getAddress(this.props.data, this.state.limit, this.state.page, (er, re) => {
            if (er) return this.setState({ loading: false, error: er });
            return this.setState({ loading: false, addressList: re, error: null });
          });
        });
      }, 3000);
    });
  }

  onConfirm() {
    let index = this.state.i + this.state.limit * this.state.page;
    this.done(null, { dpath: this.state.dpath, index: index });
    this.setState(DEFAULT_STATE);
  }

  onSelect(index) {
    this.setState({ i: index });
  }

  onPage(step) {
    let page = this.state.page + step;
    if (page < 0) page = 0;
    if (page == this.state.page) return;

    this.setState({ loading: true }, () => {
      this.getAddress(this.props.data, this.state.limit, page, (er, re) => {
        if (er) return this.setState({ loading: false, error: er });
        return this.setState({ loading: false, page: page, addressList: re, error: null });
      });
    });
  }

  componentDidMount() {
    this.setState({ loading: true }, () => {
      this.getAddress(this.props.data, this.state.limit, this.state.page, (er, re) => {
        if (er) return this.setState({ loading: false, error: er });
        return this.setState({ loading: false, addressList: re, error: null });
      });
    });
  }

  // UI conventions
  showAddresses(defaultIndex, addressList) {
    return addressList.map((address, index) => {
      return (
        <ul key={address} className={cx("col-12", "col-lg-6", "address-checkbox", "animated", "fadeInUp", "mt-3", "mb-3")}>
          <li >
            <input
              type="checkbox"
              id={"checkbox-options-" + address}
              value={address}
              onChange={() => this.onSelect(index)}
              checked={index === defaultIndex} />
            <label htmlFor={"checkbox-options-" + address}>{address}</label>
          </li>
        </ul>
      );
    });
  }

  render() {
    return (
      <div className={cx("row", "align-items-center", "wallet-body", "animated", "zoomIn")}>
        <div className={cx("col")}>
          <div className={cx("box-form", { "loading": this.state.loading })}>

            <div className={cx("row", "pt-3", "mb-3")}>
              <div className={cx("col")}>
                <h2>Choose Your Address</h2>
              </div>
            </div>

            {this.state.addressList && this.state.addressList.length > 1 ?
              <div className={cx("row", "mb-3")}>
                <div className={cx("col-12", "col-lg-6", "mt-3", "mb-3")}>
                  <div className={cx("row", "h-100", "ml-3", "mr-3")}>
                    {this.state.error ?
                      <div className={cx("col", "d-flex", "justify-content-center", "align-items-center")}>
                        <p className={cx("warning")}>{this.state.error}</p>
                      </div>
                      : null}
                    <div className={cx("col", "d-flex", "justify-content-center", "align-items-center")}>
                      <input type="text" className={cx("input")} value={this.state.dpath} onChange={this.onDpath} />
                    </div>
                  </div>
                </div>
                {this.showAddresses(this.state.i, this.state.addressList)}
                < div className={cx("col-12", "col-lg-6", "mt-3", "mb-3")}>
                  <div className={cx("row", "h-100")}>
                    <div className={cx("col-3", "col-sm-2", "d-flex", "justify-content-center", "align-items-center")}>
                      <button className={cx("small-circle-btn")} onClick={() => { this.onPage(-1) }}><i className={cx("previous")} /></button>
                    </div>
                    <div className={cx("col-2", "col-sm-2", "d-flex", "justify-content-center", "align-items-center")}>
                      <button className={cx("small-circle-btn")}>{this.state.page + 1}</button>
                    </div>
                    <div className={cx("col-3", "col-sm-2", "d-flex", "justify-content-center", "align-items-center")}>
                      <button className={cx("small-circle-btn")} onClick={() => { this.onPage(1) }}><i className={cx("next")} /></button>
                    </div>
                    <div className={cx("col-4", "col-sm-6", "d-flex", "justify-content-center", "align-items-center")}>
                      <button className={cx("primary-btn")} onClick={this.onConfirm}>OK</button>
                    </div>
                  </div>
                </div>
              </div>
              :
              <div className={cx("row", "mb-3")}>
                {this.showAddresses(this.state.i, this.state.addressList)}
                <div className={cx("col-12", "col-lg-6", "mt-3", "mb-3")}>
                  <div className={cx("row", "h-100")}>
                    <div className={cx("col", "d-flex", "justify-content-center", "align-items-center")}>
                      <button className={cx("primary-btn")} onClick={this.onConfirm}>OK</button>
                    </div>
                  </div>
                </div>
              </div>
            }

          </div>
        </div>
      </div >
    );
  }
}

export default ConfirmAddress;