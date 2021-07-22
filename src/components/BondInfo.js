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
  const {bond, bondExist} = props;
  const closeDetails = () => {
    setOpen(false);
  }
  let {unlock, lockup} = pact.poolInfo;
  unlock = unlock? unlock.int : unlock;
  lockup = lockup? lockup.int : lockup;
  let bondDate = bond.bond.date ? bond.bond.date.timep : bond.bond.date;
  let date = new Date();
  let renewDate = new Date();
  let unbondDate = new Date();
  if (bondDate === bond.bond.date.timep) {
    let bondDateFormat = new Date(bondDate)
    renewDate = new Date(renewDate.setDate(bondDateFormat.getDate()+lockup))
    unbondDate = new Date(unbondDate.setDate(bondDateFormat.getDate()+lockup+unlock))
  }

  return(
    <div role="list" class="ui divided list" style={{margin: "10px"}}>
      <div class="bheader">
        <h3>Bond Detail</h3>
      </div>
    <div class="btable">
      <table class="btable">
        <tbody>
          <tr class="bitem">
            <td class="blabel">Bond Name</td>
            <td colspan="3" class="blong bname">{bond.key.length > 64 ? bond.key.slice(0,32)+ "..."+bond.key.slice(45): bond.key}
            </td>
          </tr>
          <tr class="bitem">
            <td class="blabel">Account</td>
            <td colspan="3" class="bvalue baccount">
              {bond.bond.account}
            </td>
          </tr>
          <tr class="bitem">
            <td class="blabel">Pool</td>
            <td class="bvalue">{bond.bond.pool}</td>
            <td class="blabel">Balance</td>
            <td class="bvalue">{bond.bond.balance}</td>
          </tr>
          <tr class="bitem">
            <td class="blabel">Activity</td>
            <td class="bvalue">{bond.bond.activity && bond.bond.activity.int}</td>
            <td class="blabel">APY</td>
            <td class="bvalue">{bond.bond.rate && (bond.bond.rate*100).toString().slice(0,5)}%</td>
          </tr>
          <tr class="bitem">
            <td class="blabel">Date</td>
            <td class="bvalue">{date.toISOString().slice(0,19)}</td>
            <td class="blabel">Renew</td>
            <td class="bvalue">{renewDate.toISOString().slice(0,19)}</td>
          </tr>
          <tr class="bitem">
            <td class="blabel">Unbond</td>
            <td class="bvalue">{unbondDate.toISOString().slice(0,19)}</td>
            <td class="blabel">Renewed</td>
            <td class="bvalue">{bond.bond.renewed && bond.bond.renewed.int}</td>
          </tr>
        </tbody>
      </table>
      <br/>
      <SimpleSign
        disabled={bond.key === ""}
        activity="Renew"
        bond={bond.key}
        bondInfo={bond.bond}
        />
      <SimpleSign
        disabled={bond.key === ""}
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
      </div>
    </div>
  )
}

export default BondInfo
