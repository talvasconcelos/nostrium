<script>
  export let picture;
</script>

<figure style={`background-image: url(${picture})`}>
  <img
    src={picture}
    alt="avatar"
  />
</figure>

<style>
  figure {
    margin: 0;
    width: 50px;
    height: 50px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 50%;
  }
  img {
    display: none;
  }
</style>
