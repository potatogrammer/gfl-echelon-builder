import React, { Component } from "react";
import { Modal, Button, InputNumber } from "antd";
import "./Modal.css";
import _ from "lodash";

class ChangeStatsModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      visible: true,
      stats: _.cloneDeep(props.InfoCardContent),
      handleStatsAdjustment: props.handleStatsAdjustment,
      handleAdjustStatsButton: props.handleAdjustStatsButton,
    };
  }

  handleOk = () => {
    this.setState({ loading: true });
    this.state.handleStatsAdjustment(this.state.stats);
    setTimeout(
      () => {
        this.setState({ loading: false, visible: false });
      },
      this.state.handleAdjustStatsButton(),
      3000
    );
  };

  handleCancel = () => {
    this.setState({ visible: false });
    this.state.handleAdjustStatsButton();
  };

  onChange = (title, value) => {
    if (title === "level" || title === "favor") {
      if (value > 100) value = 100;
      else if (value < 0) value = 0;
    } else if (title === "link") {
      if (value > 5) value = 5;
      else if (value < 0) value = 0;
    } else if (title === "skill1Level" || title === "skill2Level") {
      if (value > 10) value = 10;
      else if (value < 0) value = 0;
    }
    const stats = this.state.stats;
    stats[title] = value;
    this.setState({ stats: stats });
  };

  render() {
    return this.state.visible ? (
      <div>
        <Modal
          className="Modal"
          visible={this.state.visible}
          title="Title"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button
              className="Modal-button-return"
              key="back"
              onClick={this.handleCancel}
            >
              Return
            </Button>,
            <Button
              className="Modal-button-submit"
              type="primary"
              key="submit"
              loading={this.state.loading}
              onClick={this.handleOk}
            >
              Submit
            </Button>,
          ]}
        >
          <div className="site-input-number-wrapper">
            Level:
            <InputNumber
              className="Modal-input"
              min={1}
              max={100}
              value={this.state.stats.level}
              onChange={(values) => this.onChange("level", values)}
            />
            Link:
            <InputNumber
              className="Modal-input"
              min={1}
              max={5}
              value={this.state.stats.link}
              onChange={(values) => this.onChange("link", values)}
            />
            Favor:
            <InputNumber
              className="Modal-input"
              min={0}
              max={100}
              value={this.state.stats.favor}
              onChange={(values) => this.onChange("favor", values)}
            />
            <br />
            Skill 1 Level:
            <InputNumber
              className="Modal-input"
              min={1}
              max={10}
              value={this.state.stats.skill1Level}
              onChange={(values) => this.onChange("skill1Level", values)}
            />
            <br />
            Skill 2 Level:
            <InputNumber
              className="Modal-input"
              min={1}
              max={10}
              value={this.state.stats.skill2Level}
              onChange={(values) => this.onChange("skill2Level", values)}
            />
          </div>
          ,
        </Modal>
      </div>
    ) : (
      <div>xyz</div>
    );
  }
}

export default ChangeStatsModal;
