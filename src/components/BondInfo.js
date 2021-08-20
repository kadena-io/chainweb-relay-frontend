import React, { useState, useContext, useEffect } from 'react';
import '../App.css';
import { Modal, Form, Message, Icon, List, Input, Label, Segment } from 'semantic-ui-react';
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

  const addDay = (date, add) => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate())
    newDate = newDate.setDate(newDate.getDate() + add)
    return new Date(newDate).toISOString();
  }
  const renewable = bond.bond.date && unlock && addDay(bond.bond.date.timep, lockup)
    ? (new Date(addDay(bond.bond.date.timep, lockup))<new Date() && new Date() < new Date(addDay(bond.bond.date.timep, lockup+unlock))) : false;
  const unbondable = bond.bond.date && unlock && addDay(bond.bond.date.timep, lockup+unlock)
    ? new Date(addDay(bond.bond.date.timep, lockup+unlock))< new Date() : false;
  const active = bond.bond.date && unlock && addDay(bond.bond.date.timep, lockup)
    ? (new Date(addDay(bond.bond.date.timep, lockup))>new Date()) : false;

  return(
    <Segment style={{backgroundColor: "#DCDDDE"}}>
      <div role="list" className="ui divided list" style={{margin: "10px"}} key={bond.key}>
        <div className="bheader">
          <h3>Bond Detail</h3>
        </div>
        <div className="btable">
          <table className="btable">
            <tbody>
              <tr className="bitem">
                <td className="blabel">Bond Name</td>
                <td colSpan="3" className="blong bname">{bond.key.length > 64 ? bond.key.slice(0,30)+ "..."+bond.key.slice(45): bond.key}
                </td>
              </tr>
              <tr className="bitem">
                <td className="blabel">Account</td>
                <td colSpan="3" className="bvalue baccount">
                  {bond.bond.account}
                </td>
              </tr>
              <tr className="bitem">
                <td className="blabel">Pool</td>
                <td className="bvalue">{bond.bond.pool}</td>
                <td className="blabel">Balance</td>
                <td className="bvalue">{bond.bond.balance}</td>
              </tr>
              <tr className="bitem">
                <td className="blabel">Activity</td>
                <td className="bvalue">{bond.bond.activity && bond.bond.activity.int}</td>
                <td className="blabel">APY</td>
                <td className="bvalue">{bond.bond.rate && (bond.bond.rate*100*365).toFixed(2)}%</td>
              </tr>
              <tr className="bitem">
                <td className="blabel">Date</td>
                <td className="bvalue">{bond.bond.date && bond.bond.date.timep.slice(0,19)}</td>
                <td className="blabel">Renew</td>
                <td className="bvalue">{bond.bond.date && unlock && addDay(bond.bond.date.timep, lockup).slice(0,19)}</td>
              </tr>
              <tr className="bitem">
                <td className="blabel">Unbond</td>
                <td className="bvalue">{bond.bond.date && unlock && addDay(bond.bond.date.timep, lockup + unlock).slice(0,19)}</td>
                <td className="blabel">Status</td>
                <td className="bvalue">{bond.bond.terminated ? "terminated" : active ? "active" : "inactive"}</td>
              </tr>
            </tbody>
          </table>
          <br/>
          <SimpleSign
            disabled={bond.bond.terminated || !renewable}
            activity="Renew"
            bond={bond.key}
            bondInfo={bond.bond}
            />
          <SimpleSign
            disabled={bond.bond.terminated || !unbondable}
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
    </Segment>
  )
}

export default BondInfo
