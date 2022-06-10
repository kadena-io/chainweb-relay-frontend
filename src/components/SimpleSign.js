import React, { useState, useContext, useEffect } from "react";
import "../App.css";
import {
  Modal,
  Form,
  Message,
  Icon,
  List,
  Input,
  Label,
} from "semantic-ui-react";
import Button from "../wallet/components/shared/Button";
import { PactContext } from "../contexts/PactContext";
import { ModalContext } from "../contexts/ModalContext";
import { WalletContext } from "../wallet/contexts/WalletContext";
import Pact from "pact-lang-api";

const SimpleSign = (props) => {
  const pact = useContext(PactContext);
  const wallet = useContext(WalletContext);
  const modal = useContext(ModalContext);
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [key, setKey] = React.useState(false);
  const { activity, bond, bondInfo, bondExist, style, disabled } = props;

  const BondInfo = () => {
    return (
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
          <List.Header>Bond Balance</List.Header>
          <List.Description>{bondInfo.balance} </List.Description>
        </List.Item>
        <List.Item>
          <List.Header>Bond Date</List.Header>
          <List.Description>
            {bondInfo.date && bondInfo.date.timep
              ? bondInfo.date.timep.slice(0, 19)
              : bondInfo.date.time.slice(0, 19)}{" "}
          </List.Description>
        </List.Item>
        <List.Item>
          <List.Header>Bond Activity</List.Header>
          <List.Description>
            {bondInfo.activity && bondInfo.activity.int}{" "}
          </List.Description>
        </List.Item>
      </List>
    );
  };

  return (
    <Modal
      onClose={() => setFirstOpen(false)}
      onOpen={() => {
        setFirstOpen(true);
      }}
      open={firstOpen}
      style={{ width: "900px", margin: 40 }}
      trigger={
        <Button
          buttonStyle={{
            backgroundColor: "#18A33C",
            color: "white",
            width: "80",
          }}
          disabled={disabled}
        >
          {activity}
        </Button>
      }
    >
      <Modal.Header style={{ textAlign: "center" }}>
        {activity}
        <br />"{bond}"
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <BondInfo style={{ marginLeft: "10px" }} />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions style={{ textAlign: "center" }}>
        {activity === "Unbond" ? (
          <div>
            <Button
              onClick={() => {
                setFirstOpen(false);
                pact.unBond(bondInfo.account, bond, bondInfo.guard.keys[0]);
              }}
              primary
            >
              Sign with Chainweaver / Zelcore
            </Button>
            <Button
              onClick={() => {
                setSecondOpen(true);
              }}
              primary
            >
              Sign with Bond Private Key (unsafe)
            </Button>
          </div>
        ) : (
          <div>
            <Button
              onClick={() => {
                setFirstOpen(false);
                pact.renewBond(bond, bondInfo.guard.keys[0]);
              }}
              primary
            >
              Sign with Chainweaver / Zelcore
            </Button>
            <Button
              onClick={() => {
                setSecondOpen(true);
              }}
              primary
            >
              Sign with Private Key (unsafe)
            </Button>
          </div>
        )}
      </Modal.Actions>

      <Modal
        onClose={() => setSecondOpen(false)}
        open={secondOpen}
        style={{ width: "500px" }}
      >
        <Modal.Header>Sign with your Bond key</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <List>
              <List.Item>
                <List.Header>Bond</List.Header>
                <List.Description>{bond}</List.Description>
              </List.Item>
            </List>
            <p
              style={{
                color: "red",
              }}
            >
              Note: Pasting your private key is not safe. Do you want to
              continue?
            </p>
            <Input
              placeholder="Enter Bond Private Key"
              style={{ width: "360px" }}
              onChange={(e) => setKey(e.target.value)}
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          {activity === "Unbond" ? (
            <div>
              <Button
                onClick={() => {
                  setFirstOpen(false);
                  setSecondOpen(false);
                  pact.unBond(
                    bondInfo.account,
                    bond,
                    bondInfo.guard.keys[0],
                    false,
                    key
                  );
                }}
                primary
                disabled={key.length !== 64}
              >
                Unbond with Bond Private Key
              </Button>
            </div>
          ) : (
            <div>
              <Button
                onClick={() => {
                  setFirstOpen(false);
                  setSecondOpen(false);
                  pact.renewBond(bond, bondInfo.guard.keys[0], false, key);
                }}
                primary
                disabled={key.length !== 64}
              >
                Renew with Private Key
              </Button>
            </div>
          )}
        </Modal.Actions>
      </Modal>
    </Modal>
  );
};

export default SimpleSign;
