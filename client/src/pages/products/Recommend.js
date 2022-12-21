import React from 'react'

const Recommend = () => {

  const { books } = useGetBooksQuery('booksList', {
    selectFromResult: ({ data }) => ({
      books: data?.ids.map(id => data?.entities[id])
    })
  })
  return (
    <div>Recommend</div>
  )
}

export default Recommend