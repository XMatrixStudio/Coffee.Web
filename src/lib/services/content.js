async function AddText (data) {
  let res = await this.$https.post('/content/text', {
    title: data.title,
    text: data.text,
    tags: data.tags,
    isPublic: data.isPublic
  })
  return res.data
}

async function GetText () {
  let res = await this.$https.get('/content/texts')
  return res.data
}

async function DeleteText(id) {
  console.log(id)
  let res = await this.$https.delete('/content/text/' + id)
  return res.data
}

async function UpdateText(data) {
  let res = await this.$https.patch('/content/text/' + data.id, {
    title: data.title,
    content: data.content,
    tags: data.tags,
    public: data.public
  })
  return res.data

}

export default {
  AddText: AddText,
  GetText: GetText,
  DeleteText: DeleteText,
  UpdateText: UpdateText
}
