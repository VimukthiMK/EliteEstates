import 'src/components/list/list.scss'
import Card from"src/components/card/Card"

function List({posts}){
  return (
    <div className='list'>
      {posts.map(item=>(
        <Card key={item.id} item={item}/>
      ))}
    </div>
  )
}

export default List