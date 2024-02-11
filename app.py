from flask import Flask, render_template, jsonify

app = Flask(__name__)

# Inisialisasi status awal untuk setiap meja
tables_status = {table_id: False for table_id in range(1, 15)}

@app.route('/')
def index():
    return render_template('index.html', num_tables=14)

# API endpoint untuk mendapatkan status lampu untuk setiap meja
@app.route('/api/lamp_status/<int:table_id>', methods=['GET'])
def get_lamp_status(table_id):
    global tables_status
    return jsonify({'table_id': table_id, 'status': tables_status[table_id]})

if __name__ == '__main__':
    app.run(debug=True)
