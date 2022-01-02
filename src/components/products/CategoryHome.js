import Link from "next/dist/client/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { connect, useSelector } from "react-redux";
import { changeStringPath } from "../../utils/string";


const CategoryHome = ({
    category
}) => {
    return (
        <div class="hp-mod-card-content J_CategoriesItems theme-border-categories">
            <div class="card-categories-ul">
                {category && category.map((data) => (
                    // {console.log(data)}
                    <div class="card-categories-li hp-mod-card-hover align-left">
                        <a class="card-categories-li-content" href={`/shop/category/${changeStringPath(data.category_name)}`} title="Áo" thun="" nam="" data-spm-anchor-id="a2o4n.home.categories.2" data-aplus-ae="x2_951dbdc">
                            <div class="card-categories-image-container">
                                {data && data.image ? (
                                    <img class="image" src={data.image} onerror="this.src='https://vn-live-01.slatic.net/p/4beec775d429fba530833ad72d8ddcb6.jpg'" alt={data.category_name} />

                                ) : (
                                    <img class="image" src="https://lzd-img-global.slatic.net/g/p/4beec775d429fba530833ad72d8ddcb6.jpg_170x170q90.jpg_.webp" onerror="this.src='https://vn-live-01.slatic.net/p/4beec775d429fba530833ad72d8ddcb6.jpg'" alt="Áo thun nam" />
                                )}
                            </div>
                            <div class="card-categories-name">
                                <span class="text">
                                    <Link href={`/shop/category/${changeStringPath(data.category_name)}`}>
                                        <a>{data.category_name}</a>
                                    </Link>

                                </span>
                            </div>
                        </a>
                    </div>
                ))}

            </div>
        </div>
    );
};
export default connect(null, {})(CategoryHome);
