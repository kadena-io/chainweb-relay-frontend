import React, { useState, useContext, useEffect } from 'react';
import '../App.css';
import { Modal, Form, Message, Icon, List, Input, Label } from 'semantic-ui-react';
import Button from '../wallet/components/shared/Button';
import { PactContext } from "../contexts/PactContext";
import { WalletContext } from "../wallet/contexts/WalletContext"
import Pact from 'pact-lang-api';
import SimpleSign from './SimpleSign'

const BondDetail = (props) => {
  const pact = useContext(PactContext);
  const wallet = useContext(WalletContext);

  const [firstOpen, setFirstOpen] = React.useState(false)
  const [secondOpen, setSecondOpen] = React.useState(false)
  const [key, setKey] = React.useState(false);
  const {bond, bondExist, style} = props;

  console.log(bond.bond)
  const BondInfo = () => {
    return(
      <List style={{margin: "20px"}}>
        <List.Item>
          <List.Header>Bond Name</List.Header>
          <List.Description>{bond.key} </List.Description>
        </List.Item>
        <List.Item>
          <List.Header>Pool</List.Header>
          <List.Description>{bond.bond.pool} </List.Description>
        </List.Item>
        <List.Item>
          <List.Header>KDA Account</List.Header>
          <List.Description>{bond.bond.account} </List.Description>
        </List.Item>
        <List.Item>
          <List.Header>Balance</List.Header>
          <List.Description>{bond.bond.balance} </List.Description>
        </List.Item>
        <List.Item>
          <List.Header>Date</List.Header>
          <List.Description>{bond.bond.date && bond.bond.date.timep} </List.Description>
        </List.Item>
        <List.Item>
          <List.Header>Elapsed</List.Header>
          <List.Description>{bond.bond.date && Math.floor((new Date()*60-new Date(bond.bond.date.timep))/(60*60*60*60*60*60*24))} </List.Description>
        </List.Item>
        <List.Item>
          <List.Header>Activity</List.Header>
          <List.Description>{bond.bond.activity && bond.bond.activity.int} </List.Description>
        </List.Item>
        <List.Item>
          <List.Header>Renewed</List.Header>
          <List.Description>{bond.bond.renewed && bond.bond.renewed.int} </List.Description>
        </List.Item>
        <List.Item>
          <List.Header>Remaining Lockup</List.Header>
          <List.Description>{bond.bond.lockup && bond.bond.lockup.int} </List.Description>
        </List.Item>
        <List.Item>
          <SimpleSign
            disabled={bond === ""}
            activity="Renew"
            bond={bond}/>
          <SimpleSign
            disabled={bond === ""}
            activity="Unbond"
            bond={bond}/>
        </List.Item>
      </List>
    )
  }

  return (
    <Modal
        onClose={() => setFirstOpen(false)}
        onOpen={() => setFirstOpen(true)}
        open={firstOpen}
        style={{width: "1000px", margin: 40}}
        trigger={
          <List.Header as="a" >
            <p style={{...style}}>{bond.key}</p>
          </List.Header>
        }
      >
        <Modal.Header style={{textAlign:'center'}}>
          Bond Details
          <br/>
        </Modal.Header>
        <Modal.Content >
          <Modal.Description>
            <BondInfo
              style={{marginLeft: "10px"}}/>
          </Modal.Description>
        </Modal.Content>


        <Modal
          onClose={() => setSecondOpen(false)}
          open={secondOpen}
          style={{width: "700px"}}
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
        </Modal>


    </Modal>

  )
}

export default BondDetail
