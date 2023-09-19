"""empty message

Revision ID: 29f0d0a6082d
Revises: 2bbfa5145834
Create Date: 2023-09-18 13:27:17.113387

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '29f0d0a6082d'
down_revision = '2bbfa5145834'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('especialidad', schema=None) as batch_op:
        batch_op.drop_constraint('especialidad_ibfk_1', type_='foreignkey')
        batch_op.drop_column('especialista_id')

    with op.batch_alter_table('especialistas', schema=None) as batch_op:
        batch_op.add_column(sa.Column('especialidad_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(None, 'especialidad', ['especialidad_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('especialistas', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('especialidad_id')

    with op.batch_alter_table('especialidad', schema=None) as batch_op:
        batch_op.add_column(sa.Column('especialista_id', mysql.INTEGER(), autoincrement=False, nullable=True))
        batch_op.create_foreign_key('especialidad_ibfk_1', 'especialistas', ['especialista_id'], ['id'])

    # ### end Alembic commands ###
