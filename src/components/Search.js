import React, { useState, useContext, useEffect } from 'react';
import '../App.css';
import { Form, Message, Icon, List, Input, Label, Dropdown, Segment } from 'semantic-ui-react';
import Button from '../wallet/components/shared/Button';
import { PactContext } from "../contexts/PactContext";
import { WalletContext } from "../wallet/contexts/WalletContext"
import BondInfo from "./BondInfo"
import Pact from 'pact-lang-api';

function Search() {
  const pact = useContext(PactContext);
  const wallet = useContext(WalletContext);
  const [bonds, setBonds] = useState([]);
  const [bond, setBond] = useState("");

    return (
          <div >
            <div style={{marginTop: "10px", marginBottom: 10, marginLeft: "auto", marginRight: "auto", width: "360px"}}>
              <div className="field" >
                <label style={{color: "#18A33C", textAlign: "left", marginBottom: 5}}>
                  Search Bonds
                </label>
                <Input
                  value = {bond}
                  list='bonds'
                  onChange={(e) => {
                    setBonds(pact.allBonds.filter(b => {
                      return b.key.slice(0,e.target.value.length)===e.target.value;
                    }).map(b=>b.key))
                    setBond(bonds.filter(b => {
                      let bondName = b.length > 64 ? b.slice(0,25)+ "..."+b.slice(50): b;
                      return bondName===e.target.value

                    })[0])
                  }
                  }
                  placeholder='Search bonds...'
                  icon="search"
                  />
                <datalist id='bonds' >
                  {bonds.length===pact.allBonds.length ? "" : bonds.map(b => {
                    return (<option value={b.length > 64 ? b.slice(0,25)+ "..."+b.slice(50): b}></option>)
                  })}
                </datalist>
              </div>
            </div>
            {pact.allBonds.filter(b=>b.key===bond).length>0 ?
              <BondInfo bond={pact.allBonds.filter(b=>b.key===bond)[0]}/>
              : ""}
          </div>
    );

}

export default Search;
