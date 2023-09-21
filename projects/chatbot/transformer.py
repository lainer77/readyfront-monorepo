from flask import Flask, request, jsonify, render_template
from sentence_transformers import SentenceTransformer, util
import numpy as np

app = Flask(__name__)
model = SentenceTransformer('jhgan/ko-sroberta-multitask')  # 지정한 모델로 변경


@app.route('/')
def index():
    return render_template('index.html')  # HTML 파일 렌더링


@app.route('/similarity', methods=['POST'])
def calculate_similarity():
    sentence1 = request.json['sentence1']
    sentence2 = request.json['sentence2']

    embeddings1 = model.encode(sentence1, convert_to_tensor=True)
    embeddings2 = model.encode(sentence2, convert_to_tensor=True)

    similarity = util.pytorch_cos_sim(embeddings1, embeddings2).item()
    return jsonify({"similarity": similarity})


if __name__ == '__main__':
    app.run(debug=True)
