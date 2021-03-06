"""empty message

Revision ID: 201e1e1e057
Revises: 12d50a47ed5
Create Date: 2015-03-26 11:54:36.279821

"""

# revision identifiers, used by Alembic.
revision = '201e1e1e057'
down_revision = '12d50a47ed5'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('project', 'date_added')
    op.add_column('project', sa.Column('date_added', sa.DateTime(), nullable=True))
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('project', 'date_added')
    op.add_column('project', sa.Column('date_added', sa.Date(), nullable=True))
    ### end Alembic commands ###
