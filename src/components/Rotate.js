import React, { useState, useContext, useEffect } from 'react';
import '../App.css';
import { Button as SUIButton, Modal, Form, Message, Icon, List, Input, Label } from 'semantic-ui-react';
import Button from '../wallet/components/shared/Button';
import { PactContext } from "../contexts/PactContext";
import { ModalContext } from "../contexts/ModalContext";
import { WalletContext } from "../wallet/contexts/WalletContext"
import Pact from 'pact-lang-api';

const Rotate = (props) => {
  const pact = useContext(PactContext);
  const wallet = useContext(WalletContext);
  const modal = useContext(ModalContext);
  const {rotateFirstOpen, setRotateFirstOpen, rotateSecondOpen, setRotateSecondOpen} = modal;

  const [key, setKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [publicKeys, setPublicKeys] = useState([]);


  const {activity, bond, bondInfo, bondExist, style} = props;

  const BondInfo = () => {
    return(
      <List>
        <List.Item>
          <List.Header>Pool</List.Header>
          <List.Description>{bondInfo.pool} </List.Description>
        </List.Item>
        <List.Item>
          <List.Header>Associated KDA Account</List.Header>
          <List.Description>{bondInfo.account} </List.Description>
        </List.Item>
        <List.Item>
          <List.Header>Bond Guard</List.Header>
          <List.Description>{JSON.stringify(bondInfo.guard)} </List.Description>
        </List.Item>
        <Form>
          <Form.Field
            style={{marginTop: "10px", marginBottom: 5, width: "360px", marginLeft: "auto", marginRight: "auto"}}
            >
            <label style={{color: "#18A33C", marginBottom: 5, textAlign: "left", width: "400px", }}>
              Enter a new bond key and sign with the KDA account guard
            </label>
            <Input
              error={false && wallet.account.guard && wallet.account.guard.keys.includes(publicKey)}
              style={{width: "360px"}}
              icon='key'
              iconPosition='left'
              placeholder='New Bond Guard (Enter Public Key)'
              autoFocus="autoFocus"
              value={publicKey}
              onChange={(e) => {
                setPublicKey(e.target.value)
              }}
              action= {
                <SUIButton
                  disabled={publicKey.length !== 64 || publicKeys.indexOf(publicKey)!==-1 || (false && wallet.account.guard && wallet.account.guard.keys.includes(publicKey))}
                  icon="add"
                  onClick={() => {
                    setPublicKeys([...publicKeys, publicKey])
                    setPublicKey("")
                  }}
                />
              }
            />
            {(false && wallet.account.guard && wallet.account.guard.keys.includes(publicKey))
              ?
              <Label pointing color="red" hidden >
                Please use a key that is not used in your Kadena account
              </Label>
              : ""
            }
            <List celled style={{overflowX: "auto"}}>
            {publicKeys.map(item =>  <List.Item icon='key' content={item} key={item+"key"}/>)}
           </List>
          </Form.Field>
        </Form>
      </List>
    )
  }

  return (
    //First Modal
    <Modal
        onClose={() => {
          setRotateFirstOpen("")
          setPublicKey("")
          setPublicKeys([])
          setKey("")
        }}
        onOpen={() => {
          setRotateFirstOpen(bond)
        }}
        open={rotateFirstOpen === bond}
        style={{width: "900px", margin: 40}}
        trigger={
          <Button
            buttonStyle={{
              backgroundColor: "#18A33C",
              color: "white",
              width:"80"
            }}
          >
          {activity}
          </Button>
        }
      >
        <Modal.Header style={{textAlign:'center'}}>
        {activity}<br/>"{bond}"
        </Modal.Header>
        <Modal.Content >
          <Modal.Description>
            <BondInfo
            style={{marginLeft: "10px"}}/>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions style={{textAlign:'center'}}>
          {activity === "Unbond" ?
          <div >
            <Button
              onClick={() => {
                setRotateFirstOpen("")
                pact.rotateBond(bond, key, publicKeys)
                setPublicKey("")
                setPublicKeys([])
                setKey("")
              }}
              primary
              disabled={publicKey.length!==64 || publicKeys.length ===0}
              >
              Sign with Chainweaver / Zelcore
            </Button>
            <Button
              onClick={() => {
                setRotateSecondOpen(bond)
                // setOpen(false)
              }}
              primary
              disabled={publicKey.length!==64 || publicKeys.length ===0}
              >
              Sign with Bond Private Key (unsafe)
            </Button>
          </div>
          :
          <div>
            <Button
              onClick={() => {
                setRotateFirstOpen("")
                pact.rotateBond(bond, key, publicKeys)
                setPublicKey("")
                setPublicKeys([])
                setKey("")
              }}
              primary
              disabled={publicKeys.length ===0}
              >
              Sign with Chainweaver / Zelcore
            </Button>
            <Button
              onClick={() => {
                setRotateSecondOpen(bond)
              }}
              primary
              disabled={publicKeys.length ===0}
              >
              Sign with Private Key (unsafe)
            </Button>
          </div>
        }
        </Modal.Actions>

        <Modal
          onClose={() => {
            setRotateSecondOpen("")
            setPublicKey("")
            setPublicKeys([])
            setKey("")
          }}
          open={rotateSecondOpen===bond}
          style={{width: "700px"}}
        >
        <Modal.Header>Sign with your KDA account guard</Modal.Header>
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
              value={key}
              placeholder="Enter Bond Private Key"
              style={{width: "360px"}}
              onChange={(e) => {setKey(e.target.value)}}
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          {activity === "Unbond" ?
          <div>
            <Button
              onClick={() => {
                setRotateFirstOpen("")
                setRotateSecondOpen("")
                pact.rotateBond(bond, key, publicKeys, false)
                setPublicKey("")
                setPublicKeys([])
                setKey("")
              }}
              primary
              disabled={key.length!==64 || publicKeys.length ===0}
              >
              Rotate with Bond Private Key
            </Button>
          </div>
          :
          <div>
            <Button
              onClick={() => {
                setRotateFirstOpen("")
                setRotateSecondOpen("")
                pact.rotateBond(bond, key, publicKeys, false)
                setPublicKey("")
                setPublicKeys([])
                setKey("")
              }}
              primary
              disabled={key.length!==64 || publicKeys.length ===0}
              >
              Rotate with Private Key
            </Button>
          </div>
        }
        </Modal.Actions>
        </Modal>


    </Modal>

  )
}

export default Rotate
