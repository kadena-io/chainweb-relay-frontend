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
          <Form inverted>
            <Form.Field
              style={{marginTop: "10px", marginBottom: 10, width: "360px", marginLeft: "auto", marginRight: "auto"}}
              >
              <label style={{color: "#18A33C", textAlign: "left" }}>
                Search Bonds
              </label>
              <div>
              <Input
                value = {bond}
                list='bonds'
                onChange={(e) => {
                  setBonds(pact.allBonds.filter(b => {
                    return b.key.slice(0,e.target.value.length)===e.target.value;
                  }).map(b=>b.key))
                  setBond(e.target.value)
                }
                }
                placeholder='Search'
                icon="search"

                />
                <datalist id='bonds'>
                  {bonds.length===pact.allBonds.length?"" : bonds.map(b => {
                    return (<option value={b}>{b}</option>)
                  })}
                </datalist>
                </div>
            </Form.Field>
            {pact.allBonds.filter(b=>b.key===bond).length>0 ?
              <Segment style={{backgroundColor: "#DCDDDE"}}>
                <BondInfo bond={pact.allBonds.filter(b=>b.key===bond)[0]}/>
              </Segment>
              : ""}
          </Form>
    );

}

export default Search;
