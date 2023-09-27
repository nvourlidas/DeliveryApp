<template>
    <div>
        <div class="container">
        <h1 class="header">Καλώς Ήρθατε</h1>
        <p class="subheader">Αρχική Σελίδα Dellivery App!</p>
        
    </div>
    </div>
</template>

<script>
export default{}
</script>


<style scoped>
    .container {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.831); 
    padding: 20px; 
}

        .header {
            font-size: 3rem;
            color: #333;
        }

        .subheader {
            font-size: 1.5rem;
            color: #777;
            text-align: center;
        }

        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007BFF;
            color: #fff;
            text-decoration: none;
            font-size: 1.2rem;
            border-radius: 5px;
            transition: background-color 0.3s;
        }

        .button:hover {
            background-color: #0056b3;
        }
</style>