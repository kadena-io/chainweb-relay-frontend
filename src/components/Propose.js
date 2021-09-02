import React, { useState, useContext, useEffect } from 'react';
import '../App.css';
import { Modal, Form, Message, Icon, List, Input, Label, Select } from 'semantic-ui-react';
import Button from '../wallet/components/shared/Button';
import { PactContext } from "../contexts/PactContext";
import { ModalContext } from "../contexts/ModalContext";
import { WalletContext } from "../wallet/contexts/WalletContext"
import Pact from 'pact-lang-api';

const Propose = (props) => {
  const pact = useContext(PactContext);
  const wallet = useContext(WalletContext);
  const modal = useContext(ModalContext);
  const [open, setOpen] = useState(false)
  const [bond, setBond] = useState("")
  const [firstOpen, setFirstOpen] = useState(false)
  const [secondOpen, setSecondOpen] = useState(false);
  const [key, setKey] = React.useState("");

  return (
    <Modal
        onClose={() => setFirstOpen(false)}
        onOpen={() => {
          setFirstOpen(true)
        }}
        open={firstOpen}
        style={{width: "900px", margin: 40}}
        trigger={
          <Button
            buttonStyle={{
              backgroundColor: "#18A33C",
              color: "white",
              width:"80"
            }}
            disabled={(!props.header.number && typeof props.header.number !== "number") || !props.header.hash || !props.header.hash}
          >
          Propose
          </Button>
        }
      >
        <Modal.Header style={{textAlign:'center'}}>
          Propose a Header
        </Modal.Header>
        <Modal.Content>
          <h3> Header Info </h3>
          <textArea disabled style={{width: "80%", height: 115}}>
          {props.header.number?
            `{
    "receipts-root": ${props.header["receipts-root"]},
    "number": {
        "int": ${props.header.number.int}
    },
    "hash": ${props.header.hash}
}` : ""}
          </textArea>
        </Modal.Content>
        <Modal.Content>
          <h3> Select Bond </h3>
          <Select
            placeholder='Select your bond'
            options={props.userBonds.map(b=>{return {key:b.key, text: b.key, value: b.key}})}
            onChange={(evt, data) => {
              setBond(data.value)
            }}
            style={{width: "100%"}}/>
        </Modal.Content>
        <Modal.Actions>
        <Button
          onClick={() => {
            setFirstOpen(false)
            console.log(bond)
            console.log(bond, props.userBonds.filter(b => b.key===bond))
            pact.propose(props.header, bond, props.userBonds.filter(b => b.key===bond)[0].bond.guard.keys[0], true)
          }}
          primary
          disabled={bond === ""}
          >
          Sign with Chainweaver / Zelcore
        </Button>
        <Button
          onClick={() => {
            setSecondOpen(true)
          }}
          primary
          disabled={bond === ""}
          >
          Sign with Bond Private Key (unsafe)
        </Button>
        </Modal.Actions>
        <Modal
        onClose={() => setSecondOpen(false)}
        open={secondOpen}
        style={{width: "500px"}}
        >
        <Modal.Header>Sign with your Bond key</Modal.Header>
        <Modal.Content >
          <Modal.Description>
            <List>
              <List.Item>
                <List.Header>
                  Bond
                </List.Header>
                <List.Description>
                  {bond}
                </List.Description>
              </List.Item>
            </List>
            <p style={{
                color: "red"
              }}>
              Note: Pasting your private key is not safe. Do you want to continue?
            </p>
            <Input
              placeholder="Enter Bond Private Key"
              style={{width: "360px"}}
              onChange={(e) => setKey(e.target.value)}
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <div>
            <Button
              onClick={() => {
                setFirstOpen(false)
                setSecondOpen(false)
                pact.propose(props.header, bond, props.userBonds.filter(b => b.key===bond)[0].bond.guard.keys[0], false, key)
              }}
              primary
              disabled={key.length!==64}
              >
              Propose with Bond Private Key
            </Button>
          </div>
        </Modal.Actions>
        </Modal>
      </Modal>
  )
}

export default Propose
