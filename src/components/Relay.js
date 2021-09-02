import React, { useState, useContext, useEffect } from 'react';
import '../App.css';
import { Form, Message, Icon, List, Input, Label, Divider } from 'semantic-ui-react';
import Button from '../wallet/components/shared/Button';
import Propose from './Propose.js'
import { PactContext } from "../contexts/PactContext";
import { WalletContext } from "../wallet/contexts/WalletContext"
import Pact from 'pact-lang-api';

function Relay(props) {
  const pact = useContext(PactContext);
  const wallet = useContext(WalletContext);
  const [receipt, setReceipt] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [hash, setHash] = React.useState("");
  const [header, setHeader] = React.useState({})

    useEffect(()=> {
      setHeader(
        { "receipts-root": receipt,
          "number": {
              "int": number
          },
          "hash": hash
        })
    }, [receipt, number, hash])


    return (
        <Form inverted>
          <Form.Field
            style={{marginTop: "10px", marginBottom: 10, width: "360px", marginLeft: "auto", marginRight: "auto"}}
            >
            <label style={{color: "#18A33C", textAlign: "left" }}>
              Propose a header
            </label>
            <Input
              style={{marginTop: "10px"}}
              onChange={(e) => setReceipt(e.target.value)}
              placeholder='Receipts Root'
              type='text'
              />
            <Input
              style={{marginTop: "10px"}}
              onChange={(e) => setNumber(e.target.value)}
              type='number'
              placeholder='Number'
              />
            <Input
              style={{marginTop: "10px"}}
              onChange={(e) => setHash(e.target.value)}
              placeholder='Hash'
              type='text'
              />
          </Form.Field>
          <Propose header={header} userBonds={props.userBonds}/>
        </Form>
    );

}

export default Relay;
