import React, { useState, useContext, useEffect } from 'react';
import '../App.css';
import { Modal, Form, Message, Icon, List, Input, Label } from 'semantic-ui-react';
import Button from '../wallet/components/shared/Button';
import { PactContext } from "../contexts/PactContext";
import { WalletContext } from "../wallet/contexts/WalletContext"
import Pact from 'pact-lang-api';
import SimpleSign from './SimpleSign'
import Rotate from './Rotate'

const BondInfo = (props) => {
  const pact = useContext(PactContext);
  const wallet = useContext(WalletContext);
  const [open, setOpen] = React.useState(false)
  const [key, setKey] = React.useState(false);
  const {bond, bondExist, style} = props;
  const closeDetails = () => {
    setOpen(false);
  }

  return(
    <List divided style={{margin: "20px"}}>
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
        <SimpleSign
          disabled={bond.key === ""}
          activity="Renew"
          bond={bond.key}
          bondInfo={bond.bond}
          />
        <SimpleSign
          disabled={bond === ""}
          activity="Unbond"
          bond={bond.key}
          bondInfo={bond.bond}
          />
        <Rotate
          disabled={bond.key === ""}
          activity="Rotate"
          bond={bond.key}
          bondInfo={bond.bond}
          />
      </List.Item>
    </List>
  )
}

export default BondInfo
