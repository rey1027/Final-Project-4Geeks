"""empty message

Revision ID: 121aa0e5a919
Revises: 
Create Date: 2023-09-06 01:10:21.858892

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '121aa0e5a919'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('especialidad',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre_completo', sa.String(length=30), nullable=False),
    sa.Column('descripcion', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('nombre_completo')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre_completo', sa.String(length=50), nullable=False),
    sa.Column('cedula', sa.Integer(), nullable=False),
    sa.Column('edad', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('cedula'),
    sa.UniqueConstraint('edad'),
    sa.UniqueConstraint('email')
    )
    op.create_table('especialistas',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre_completo', sa.String(length=50), nullable=False),
    sa.Column('años_experiencia', sa.Integer(), nullable=False),
    sa.Column('perfil_profesional', sa.String(length=255), nullable=False),
    sa.Column('codigo_profesional', sa.Integer(), nullable=False),
    sa.Column('especialidad_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['especialidad_id'], ['especialidad.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('años_experiencia'),
    sa.UniqueConstraint('codigo_profesional')
    )
    op.create_table('tratamientos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre_completo', sa.String(length=50), nullable=False),
    sa.Column('descripcion', sa.String(length=255), nullable=False),
    sa.Column('especialista_id', sa.Integer(), nullable=True),
    sa.Column('precio', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['especialista_id'], ['especialistas.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('precio')
    )
    op.create_table('citas',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre_paciente', sa.String(length=50), nullable=False),
    sa.Column('fecha', sa.Date(), nullable=False),
    sa.Column('hora', sa.Time(), nullable=False),
    sa.Column('especialidad_id', sa.Integer(), nullable=True),
    sa.Column('tratamientos_id', sa.Integer(), nullable=True),
    sa.Column('especialistas_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['especialidad_id'], ['especialidad.id'], ),
    sa.ForeignKeyConstraint(['especialistas_id'], ['especialistas.id'], ),
    sa.ForeignKeyConstraint(['tratamientos_id'], ['tratamientos.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('fecha'),
    sa.UniqueConstraint('hora')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('citas')
    op.drop_table('tratamientos')
    op.drop_table('especialistas')
    op.drop_table('user')
    op.drop_table('especialidad')
    # ### end Alembic commands ###
