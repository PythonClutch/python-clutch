"""empty message

Revision ID: 12d50a47ed5
Revises: 19ad282b9ec
Create Date: 2015-03-26 00:07:54.266903

"""

# revision identifiers, used by Alembic.
revision = '12d50a47ed5'
down_revision = '19ad282b9ec'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('public_repos', sa.Integer(), nullable=True))
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'public_repos')
    ### end Alembic commands ###
