import { Event } from "./eventClass.js";


// 株価暴騰イベント
export class StockPriceRiseEvent extends Event {
    differenceInvestment
    differenceBond

    constructor() {
        super();
        this.title = "ぶっちぎりの爆上げ！";
        this.description = "株価が宇宙まで届く勢いで急騰中！急いでチェックしよう！";
        this.probability = 0.2;
        this.imgUrl = "images/877435.jpg";
    }

    /**
     * イベントの効果を反映
     * 新たな投資商品が増えた際の拡張性が必要かも
     * @param {UserAccount} userAccount
     * @return {void}
     */
    execute(userAccount) {
        const items = userAccount.items;
        // 変更前株価
        let beforeTotalInvestment = items[1].totalInvestment;
        let beforeTotalBond = items[2].totalBond;

        let currTotalInvestment = beforeTotalInvestment + Math.floor(this.probability * beforeTotalInvestment);
        currTotalInvestment = currTotalInvestment < 0 ? 0 : currTotalInvestment;

        let currTotalBond = beforeTotalBond + Math.floor(this.probability * beforeTotalBond);
        currTotalBond = currTotalBond < 0 ? 0 : currTotalBond;

        // 株と債券の価格の減少処理
        items[1].totalInvestment = currTotalInvestment;
        items[2].totalBond = currTotalBond;

        // イベントによる差額の設定
        this.differenceInvestment = Math.abs(beforeTotalInvestment - currTotalInvestment);
        this.differenceBond = Math.abs(beforeTotalBond - currTotalBond);

        console.log("株価上昇中");
    }

    /**
     * イベントで変動した値を元の状態に戻す
     * @param {UserAccount} userAccount
     * @return {void}
     */
    resetEventValue(userAccount) {
        const items = userAccount.items;

        // 株と債券の価格を通常時に戻す
        items[1].totalInvestment -= this.differenceInvestment;
        items[2].totalBond -= this.differenceBond;
    }

    /**
     * イベントモーダルの生成
     */
    generateEventModal() {
        const modalContainer = document.createElement("div");
        modalContainer.classList.add("modal-container");
        console.log(modalContainer);
        // 現在の総資産
        modalContainer.innerHTML = `
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal${this.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src="${this.imgUrl}" alt="${this.title}" />
                        <h4>${this.description}</h4>
                    </div>
                    <div class="modal-footer">
                        <button id="close-btn" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        `;

        return modalContainer;
    }
}