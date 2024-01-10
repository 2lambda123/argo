import { TradesService } from "./trades.service.js";
import { SessionService } from "../session/session.service.js";
import { Util } from "../../util.js";
import { AccountsService } from "../account/accounts.service.js";
import { ExposureService } from "../exposure/exposure.service.js";

const assert = window.chai.assert;

describe("tradesService", () => {
    const environment = "my environment";
    const token = "my token";
    const accountId = "my account id";
    const mockedTrades = [
        {
            id: 175427743,
            units: 2,
            side: "sell",
            instrument: "EUR_USD",
            time: "2014-02-13T17:47:57Z",
            price: 1.36687,
            takeProfit: 10,
            stopLoss: 5,
            trailingStop: 4,
            trailingAmount: 8
        },
        {
            id: 175427744,
            units: 3,
            side: "buy",
            instrument: "GBP_USD",
            time: "2014-02-13T17:47:59Z",
            price: 1.25894,
            takeProfit: 12,
            stopLoss: 6,
            trailingStop: 3,
            trailingAmount: 5
        },
        {
            id: 175427745,
            units: 4,
            side: "buy",
            instrument: "EUR_JPY",
            time: "2014-02-13T17:47:58Z",
            price: 128.575,
            takeProfit: 15,
            stopLoss: 7,
            trailingStop: 5,
            trailingAmount: 10
        }
    ];


    beforeEach(() => {
        const apiTrades = "/api/trades";

        /* eslint no-new:off */
        new TradesService({ value: [] });

        SessionService.setCredentials({
            environment,
            token,
            accountId
        });

        fetch.mock(apiTrades, mockedTrades);
    });

    it("getTrades", done => {
        TradesService.refresh().then(trades => {
            assert.lengthOf(trades, 3);

            assert.strictEqual(175427743, trades[0].id);
            assert.strictEqual(2, trades[0].units);
            assert.strictEqual("sell", trades[0].side);
            assert.strictEqual("EUR_USD", trades[0].instrument);
            assert.strictEqual("2014-02-13T17:47:57Z", trades[0].time);
            assert.strictEqual(1.36687, trades[0].price);
            assert.strictEqual(10, trades[0].takeProfit);
            assert.strictEqual(5, trades[0].stopLoss);
            assert.strictEqual(4, trades[0].trailingStop);
            assert.strictEqual(8, trades[0].trailingAmount);

            assert.strictEqual(175427744, trades[1].id);
            assert.strictEqual(3, trades[1].units);
            assert.strictEqual("buy", trades[1].side);
            assert.strictEqual("GBP_USD", trades[1].instrument);
            assert.strictEqual("2014-02-13T17:47:59Z", trades[1].time);
            assert.strictEqual(1.25894, trades[1].price);
            assert.strictEqual(12, trades[1].takeProfit);
            assert.strictEqual(6, trades[1].stopLoss);
            assert.strictEqual(3, trades[1].trailingStop);
            assert.strictEqual(5, trades[1].trailingAmount);

            assert.strictEqual(175427745, trades[2].id);
            assert.strictEqual(4, trades[2].units);
            assert.strictEqual("buy", trades[2].side);
            assert.strictEqual("EUR_JPY", trades[2].instrument);
            assert.strictEqual("2014-02-13T17:47:58Z", trades[2].time);
            assert.strictEqual(128.575, trades[2].price);
            assert.strictEqual(15, trades[2].takeProfit);
            assert.strictEqual(7, trades[2].stopLoss);
            assert.strictEqual(5, trades[2].trailingStop);
            assert.strictEqual(10, trades[2].trailingAmount);
        }).then(done).catch(done);
    });
});
