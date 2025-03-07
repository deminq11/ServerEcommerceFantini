import Item from "../Item"
export default function ItemList ({items}) {
    return(
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(item => (
                <Item key={item._id} item={item}/>
            ))}
        </div>
    )
}