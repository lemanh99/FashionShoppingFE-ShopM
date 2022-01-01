import Link from "next/dist/client/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { connect, useSelector } from "react-redux";


const CategoryHome = ({

}) => {
    return (
        <div class="hp-mod-card-content J_CategoriesItems theme-border-categories">
            <div class="card-categories-ul">
                <div class="card-categories-li hp-mod-card-hover align-left">
                    <a class="card-categories-li-content" href="//www.lazada.vn/ao-thun-cho-nam/?up_id=265966374&amp;clickTrackInfo=22875d0e-48be-46bb-b3d8-7bda15ea7b44__7930__265966374__static__0.09964025732116044__158075__7253&amp;from=hp_categories&amp;item_id=265966374&amp;version=v2" exp-tracking="category" algo_scm="" trackinfo="22875d0e-48be-46bb-b3d8-7bda15ea7b44__7930__265966374__static__0.09964025732116044__158075__7253" clicktrackinfo="22875d0e-48be-46bb-b3d8-7bda15ea7b44__7930__265966374__static__0.09964025732116044__158075__7253" title="Áo" thun="" nam="" data-spm-anchor-id="a2o4n.home.categories.2" data-aplus-ae="x2_951dbdc">
                        <div class="card-categories-image-container">
                            <img class="image" src="https://lzd-img-global.slatic.net/g/p/4beec775d429fba530833ad72d8ddcb6.jpg_170x170q90.jpg_.webp" onerror="this.src='https://vn-live-01.slatic.net/p/4beec775d429fba530833ad72d8ddcb6.jpg'" alt="Áo thun nam" />
                        </div>
                        <div class="card-categories-name">
                            <span class="text">
                                Áo thun nam
                            </span>
                        </div>
                    </a>
                </div>
                <div class="card-categories-li hp-mod-card-hover align-left">
                    <a class="card-categories-li-content" href="//www.lazada.vn/ao-thun-cho-nam/?up_id=265966374&amp;clickTrackInfo=22875d0e-48be-46bb-b3d8-7bda15ea7b44__7930__265966374__static__0.09964025732116044__158075__7253&amp;from=hp_categories&amp;item_id=265966374&amp;version=v2" exp-tracking="category" algo_scm="" trackinfo="22875d0e-48be-46bb-b3d8-7bda15ea7b44__7930__265966374__static__0.09964025732116044__158075__7253" clicktrackinfo="22875d0e-48be-46bb-b3d8-7bda15ea7b44__7930__265966374__static__0.09964025732116044__158075__7253" title="Áo" thun="" nam="" data-spm-anchor-id="a2o4n.home.categories.2" data-aplus-ae="x2_951dbdc">
                        <div class="card-categories-image-container">
                            <img class="image" src="https://lzd-img-global.slatic.net/g/p/4beec775d429fba530833ad72d8ddcb6.jpg_170x170q90.jpg_.webp" onerror="this.src='https://vn-live-01.slatic.net/p/4beec775d429fba530833ad72d8ddcb6.jpg'" alt="Áo thun nam" />
                        </div>
                        <div class="card-categories-name">
                            <span class="text">
                                Áo thun nam
                            </span>
                        </div>
                    </a>
                </div>
                <div class="card-categories-li hp-mod-card-hover align-left">
                    <a class="card-categories-li-content" href="//www.lazada.vn/ao-thun-cho-nam/?up_id=265966374&amp;clickTrackInfo=22875d0e-48be-46bb-b3d8-7bda15ea7b44__7930__265966374__static__0.09964025732116044__158075__7253&amp;from=hp_categories&amp;item_id=265966374&amp;version=v2" exp-tracking="category" algo_scm="" trackinfo="22875d0e-48be-46bb-b3d8-7bda15ea7b44__7930__265966374__static__0.09964025732116044__158075__7253" clicktrackinfo="22875d0e-48be-46bb-b3d8-7bda15ea7b44__7930__265966374__static__0.09964025732116044__158075__7253" title="Áo" thun="" nam="" data-spm-anchor-id="a2o4n.home.categories.2" data-aplus-ae="x2_951dbdc">
                        <div class="card-categories-image-container">
                            <img class="image" src="https://lzd-img-global.slatic.net/g/p/4beec775d429fba530833ad72d8ddcb6.jpg_170x170q90.jpg_.webp" onerror="this.src='https://vn-live-01.slatic.net/p/4beec775d429fba530833ad72d8ddcb6.jpg'" alt="Áo thun nam" />
                        </div>
                        <div class="card-categories-name">
                            <span class="text">
                                Áo thun nam
                            </span>
                        </div>
                    </a>
                </div>
                <div class="card-categories-li hp-mod-card-hover align-left">
                    <a class="card-categories-li-content" href="//www.lazada.vn/ao-thun-cho-nam/?up_id=265966374&amp;clickTrackInfo=22875d0e-48be-46bb-b3d8-7bda15ea7b44__7930__265966374__static__0.09964025732116044__158075__7253&amp;from=hp_categories&amp;item_id=265966374&amp;version=v2" exp-tracking="category" algo_scm="" trackinfo="22875d0e-48be-46bb-b3d8-7bda15ea7b44__7930__265966374__static__0.09964025732116044__158075__7253" clicktrackinfo="22875d0e-48be-46bb-b3d8-7bda15ea7b44__7930__265966374__static__0.09964025732116044__158075__7253" title="Áo" thun="" nam="" data-spm-anchor-id="a2o4n.home.categories.2" data-aplus-ae="x2_951dbdc">
                        <div class="card-categories-image-container">
                            <img class="image" src="https://lzd-img-global.slatic.net/g/p/4beec775d429fba530833ad72d8ddcb6.jpg_170x170q90.jpg_.webp" onerror="this.src='https://vn-live-01.slatic.net/p/4beec775d429fba530833ad72d8ddcb6.jpg'" alt="Áo thun nam" />
                        </div>
                        <div class="card-categories-name">
                            <span class="text">
                                Áo thun nam
                            </span>
                        </div>
                    </a>
                </div>
                <div class="card-categories-li hp-mod-card-hover align-left">
                    <a class="card-categories-li-content" href="//www.lazada.vn/ao-hoodie-cua-nam/?up_id=876666253&amp;clickTrackInfo=22875d0e-48be-46bb-b3d8-7bda15ea7b44__6424__876666253__static__0.09914287338899153__158075__7253&amp;from=hp_categories&amp;item_id=876666253&amp;version=v2" exp-tracking="category" algo_scm="" trackinfo="22875d0e-48be-46bb-b3d8-7bda15ea7b44__6424__876666253__static__0.09914287338899153__158075__7253" clicktrackinfo="22875d0e-48be-46bb-b3d8-7bda15ea7b44__6424__876666253__static__0.09914287338899153__158075__7253" title="Áo" hoodies="" sweatshirts="" nam="" data-spm-anchor-id="a2o4n.home.categories.5" data-aplus-ae="x5_6ef69339">
                        <div class="card-categories-image-container">
                            <img class="image" src="https://lzd-img-global.slatic.net/g/p/b32c79ad2d0fdda7e00656ef078cbbc1.jpg_170x170q90.jpg_.webp" onerror="this.src='https://vn-live-01.slatic.net/p/b32c79ad2d0fdda7e00656ef078cbbc1.jpg'" alt="Áo hoodies &amp; sweatshirts nam" />
                        </div>
                        <div class="card-categories-name">
                            <span class="text">
                                Áo hoodies &amp; sweatshirts nam
                            </span>
                        </div>
                    </a>
                </div>
                <div class="card-categories-li hp-mod-card-hover align-left">
                    <a class="card-categories-li-content" href="//www.lazada.vn/dam-nu/?up_id=335232682&amp;clickTrackInfo=22875d0e-48be-46bb-b3d8-7bda15ea7b44__6396__335232682__static__0.09903915817930614__158075__7253&amp;from=hp_categories&amp;item_id=335232682&amp;version=v2" exp-tracking="category" algo_scm="" trackinfo="22875d0e-48be-46bb-b3d8-7bda15ea7b44__6396__335232682__static__0.09903915817930614__158075__7253" clicktrackinfo="22875d0e-48be-46bb-b3d8-7bda15ea7b44__6396__335232682__static__0.09903915817930614__158075__7253" title="Đầm" data-spm-anchor-id="a2o4n.home.categories.6" data-aplus-ae="x6_7aa00ad9">
                        <div class="card-categories-image-container">
                            <img class="image" src="https://lzd-img-global.slatic.net/g/p/6bf0686ecbe761ff9e4e7364570eea8d.jpg_170x170q90.jpg_.webp" onerror="this.src='https://vn-live-01.slatic.net/p/6bf0686ecbe761ff9e4e7364570eea8d.jpg'" alt="Đầm" />
                        </div>
                        <div class="card-categories-name">
                            <span class="text">
                                Đầm
                            </span>
                        </div>
                    </a>
                </div>
                <div class="card-categories-li hp-mod-card-hover align-left">
                    <a class="card-categories-li-content" href="//www.lazada.vn/ao-thun-cho-nam/?up_id=265966374&amp;clickTrackInfo=22875d0e-48be-46bb-b3d8-7bda15ea7b44__7930__265966374__static__0.09964025732116044__158075__7253&amp;from=hp_categories&amp;item_id=265966374&amp;version=v2" exp-tracking="category" algo_scm="" trackinfo="22875d0e-48be-46bb-b3d8-7bda15ea7b44__7930__265966374__static__0.09964025732116044__158075__7253" clicktrackinfo="22875d0e-48be-46bb-b3d8-7bda15ea7b44__7930__265966374__static__0.09964025732116044__158075__7253" title="Áo" thun="" nam="" data-spm-anchor-id="a2o4n.home.categories.2" data-aplus-ae="x2_951dbdc">
                        <div class="card-categories-image-container">
                            <img class="image" src="https://lzd-img-global.slatic.net/g/p/4beec775d429fba530833ad72d8ddcb6.jpg_170x170q90.jpg_.webp" onerror="this.src='https://vn-live-01.slatic.net/p/4beec775d429fba530833ad72d8ddcb6.jpg'" alt="Áo thun nam" />
                        </div>
                        <div class="card-categories-name">
                            <span class="text">
                                Áo thun nam
                            </span>
                        </div>
                    </a>
                </div>
                <div class="card-categories-li hp-mod-card-hover align-left">
                    <a class="card-categories-li-content" href="//www.lazada.vn/ao-thun-cho-nu/?up_id=325778776&amp;clickTrackInfo=22875d0e-48be-46bb-b3d8-7bda15ea7b44__7932__325778776__static__0.09888315851195702__158075__7253&amp;from=hp_categories&amp;item_id=325778776&amp;version=v2" exp-tracking="category" algo_scm="" trackinfo="22875d0e-48be-46bb-b3d8-7bda15ea7b44__7932__325778776__static__0.09888315851195702__158075__7253" clicktrackinfo="22875d0e-48be-46bb-b3d8-7bda15ea7b44__7932__325778776__static__0.09888315851195702__158075__7253" title="Áo" thun="" nữ="" data-spm-anchor-id="a2o4n.home.categories.8" data-aplus-ae="x8_11521b76">
                        <div class="card-categories-image-container">
                            <img class="image" src="https://lzd-img-global.slatic.net/g/p/ff7bae683e7b18248d25ec6e106bd054.jpg_170x170q90.jpg_.webp" onerror="this.src='https://vn-live-01.slatic.net/p/ff7bae683e7b18248d25ec6e106bd054.jpg'" alt="Áo thun nữ" />
                        </div>
                        <div class="card-categories-name">
                            <span class="text">
                                Áo thun nữ
                            </span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};
export default connect(null, {})(CategoryHome);
