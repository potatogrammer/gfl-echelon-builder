import React from "react";
import "./InfoCard.css";
import { Row, Col } from "antd";

const InfoCard = ({ InfoCardContent, handleAdjustStatsButton }) => {
  const { name, stats } = InfoCardContent;
  console.log(stats);

  return stats.length ? (
    <div className="box">
      <div className="box-img">
        <img
          className="img-frame"
          src="https://en.gfwiki.com/images/2/2c/Infobox_border.png"
        />
      </div>
      <div className="content">
        <>
          {name}
          <div className="content-table">
            <Row justify="space-between">
              <Col span={8}>
                <Row justify="space-between">
                  <Col span={12} style={{ textAlign: "left" }}>
                    HP
                  </Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                    {stats[0][1]}
                  </Col>
                </Row>
              </Col>
              <Col span={8}>
                <Row justify="space-between">
                  <Col span={12} style={{ textAlign: "left" }}>
                    FP
                  </Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                    {stats[1][1]}
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row justify="space-between">
              <Col span={8}>
                <Row justify="space-between">
                  <Col span={12} style={{ textAlign: "left" }}>
                    ROF
                  </Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                    {stats[5][1]}
                  </Col>
                </Row>
              </Col>
              <Col span={8}>
                <Row justify="space-between">
                  <Col span={12} style={{ textAlign: "left" }}>
                    ACC
                  </Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                    {stats[2][1]}
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row justify="space-between">
              <Col span={8}>
                <Row justify="space-between">
                  <Col span={12} style={{ textAlign: "left" }}>
                    EVA
                  </Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                    {stats[3][1]}
                  </Col>
                </Row>
              </Col>
              <Col span={8}>
                <Row justify="space-between">
                  <Col span={12} style={{ textAlign: "left" }}>
                    SPD
                  </Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                    {stats[4][1]}
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row justify="space-between">
              <Col span={8}>
                <Row justify="space-between">
                  <Col span={12} style={{ textAlign: "left" }}>
                    AP
                  </Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                    {stats[6][1]}
                  </Col>
                </Row>
              </Col>
              <Col span={8}>
                <Row justify="space-between">
                  <Col span={12} style={{ textAlign: "left" }}>
                    CR
                  </Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                    {stats[7][1]}
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </>
      </div>
      <div className="button">
        <a className="b1" onClick={handleAdjustStatsButton}>
          Adjust Stats
        </a>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default InfoCard;
