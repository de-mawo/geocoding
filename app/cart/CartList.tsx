

import { HiOutlineMinus, HiOutlinePlus, HiOutlineTrash } from "react-icons/hi2";



const CartList = () => {

    const Cart = [
        {
          id: "6bf56de4-7ed2-4ece-b45b-5001b52a99bab",
          title: "Chaw Burger",
          shortDescr: "smoked cherries dumpling  with a delicate texture",
          longDescr:
            "marinated oats quesadilla is a little greasy with a tough texture. It has subtle hints of wheat with myrtle plant and has a dash of calamint",
          price: 104,
          image:
            "/img/food/burger.png",
          category: "breakfast",
      
          prepType: ["well-done", "medium"],
          quantity: 2,
          instructions: "Don't put chilli sauce",
          order_number : "DPS2023183120",
          preparation: 'well-done'
        },
        {
          id: "e08155e0-8708-47c3-8234-09b30f147f64",
          title: "Chicken Fillet",
          shortDescr: "wheat with myrtle plant and has a dash of calamint.",
          longDescr:
            "marinated oats quesadilla is a little greasy with a tough texture. It has subtle hints of wheat with myrtle plant and has a dash of calamint",
          price: 71,
          image:
          "/img/food/chicken-fillet.png",
          category: "drinks",
      
          prepType: ["well-done", "medium"],
          quantity: 1,
          instructions: "Don't put chilli sauce",
          order_number : "DPS2023183120",
          preparation: 'medium'
        },
      ]
    
    
  return (
    <div className="">
    <p>Your Items</p>
    { Cart?.map((item, index) => (
      <div className="flex justify-between items-center mt-3" key={index}>
      <div className="flex space-x-3 border rounded-full px-2 ">
        <button >
          <HiOutlineMinus />
        </button>
        <p> {item.quantity}</p>
        <button >
          <HiOutlinePlus />
        </button>
      </div>
      <div className="px-3">
        <p>{item.shortDescr}: <span className="text-xs italic">({item.instructions}) </span> </p>
      </div>
      <div className="flex items-center space-x-2">
        <p>{item.price} </p>
        <HiOutlineTrash className="cursor-pointer text-green-700"   />
      </div>
    </div>

    )) }
    
  </div>
  )
}

export default CartList