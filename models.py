class UserProfile(db.model):
    __tablename__ = 'profile'
    
    uid = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), unique=True)
    oath_name = db.Column(db.String(100))
    nickname = db.Column(db.String(50))
    age = db.Column(db.Integer)
    gender = db.Column(db.String(15))
    bio = db.Column(db.String(2048))
    message_ids = db.relationship('Conversations', backref='profile', lazy=True)
    
    def __repr__(self):
        return '<UserProfile for {}>'.format(self.email)


class Conversations(db.model):
    __tablename__ = 'conversations'
    
    message_id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(Integer, ForeignKey('profile.uid'), nullable=False)
    receiver_id = db.Column(Integer, ForeignKey('profile.uid'), nullable=False)
    message = db.Column(db.String(2048))